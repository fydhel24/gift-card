<?php

namespace App\Http\Controllers;

use App\Models\TarjetaGiftCard;
use App\Models\Cliente;
use App\Services\GiftCardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TarjetaGiftCardController extends Controller
{
    /**
     * Muestra lista paginada y buscable (para DataTable en shadcn).
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 15);

        $query = TarjetaGiftCard::with(['cliente:id,nombre,apellido_paterno,email', 'user:id,name']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('codigo_unico', 'like', "%{$search}%")
                  ->orWhereHas('cliente', fn($cq) => $cq->where(function ($sub) use ($search) {
                      $sub->where('nombre', 'like', "%{$search}%")
                          ->orWhere('apellido_paterno', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                  }));
            });
        }

        $tarjetas = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('GiftCards/Index', [
            'tarjetas' => $tarjetas,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    /**
     * Muestra formulario para crear (sin cliente).
     */
    public function create(): Response
    {
        return Inertia::render('GiftCards/Create');
    }

    /**
     * Crea tarjeta (cliente opcional en este paso).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'codigo_unico' => ['required', 'string', 'max:255', Rule::unique('tarjeta_gift_cards')],
            'saldo_inicial' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'tipo' => ['nullable', 'string', 'max:100'],
            'fecha_expiracion' => ['nullable', 'date', 'after_or_equal:today'],
            'estado' => [Rule::in(['activa', 'inactiva'])],
        ]);

        $validated['saldo_actual'] = $validated['saldo_inicial'];
        $validated['user_id'] = auth()->id();

        DB::beginTransaction();
        try {
            $tarjeta = TarjetaGiftCard::create($validated);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al crear la tarjeta.']);
        }

        // Redirección a detalle (Inertia)
        return to_route('gift-cards.show', $tarjeta)->with('success', 'Tarjeta creada. Asigna un cliente si lo deseas.');
    }

    /**
     * Muestra detalle + clientes disponibles para asociar.
     */
    public function show(TarjetaGiftCard $tarjetaGiftCard): Response
    {
        $tarjetaGiftCard->load(['cliente', 'user', 'movimientos' => function($q) {
            $q->with('user:id,name')->latest();
        }]);
        $clientesDisponibles = Cliente::where('activo', true)
            ->when($tarjetaGiftCard->cliente_id, fn($q) => $q->whereNot('id', $tarjetaGiftCard->cliente_id))
            ->get(['id', 'nombre', 'apellido_paterno']);

        return Inertia::render('GiftCards/Show', [
            'tarjeta' => $tarjetaGiftCard,
            'clientesDisponibles' => $clientesDisponibles,
        ]);
    }

    /**
     * Asocia cliente a tarjeta (llamado desde React via Inertia.post).
     */
    public function associateClient(Request $request, TarjetaGiftCard $tarjetaGiftCard)
    {
        $request->validate(['cliente_id' => 'required|exists:clientes,id']);

        try {
            GiftCardService::associateClient($tarjetaGiftCard, $request->cliente_id);
        } catch (\Exception $e) {
            return back()->withErrors(['cliente_id' => $e->getMessage()]);
        }

        return back()->with('success', 'Cliente asociado correctamente.');
    }

    /**
     * Desasocia cliente.
     */
    public function dissociateClient(TarjetaGiftCard $tarjetaGiftCard)
    {
        GiftCardService::dissociateClient($tarjetaGiftCard);
        return back()->with('success', 'Cliente desasociado.');
    }

    /**
     * Formulario de edición.
     */
    public function edit(TarjetaGiftCard $tarjetaGiftCard): Response
    {
        $clientes = Cliente::where('activo', true)->get(['id', 'nombre', 'apellido_paterno']);
        return Inertia::render('GiftCards/Edit', [
            'tarjeta' => $tarjetaGiftCard->load(['cliente', 'user']),
            'clientes' => $clientes,
        ]);
    }

    /**
     * Actualiza tarjeta.
     */
    public function update(Request $request, TarjetaGiftCard $tarjetaGiftCard)
    {
        $validated = $request->validate([
            'codigo_unico' => ['required', 'string', 'max:255', Rule::unique('tarjeta_gift_cards')->ignore($tarjetaGiftCard->id)],
            'saldo_actual' => ['required', 'numeric', 'min:0'],
            'cliente_id' => ['nullable', 'exists:clientes,id'],
            'tipo' => ['nullable', 'string', 'max:100'],
            'estado' => [Rule::in(['activa', 'inactiva'])],
            'fecha_expiracion' => ['nullable', 'date', 'after_or_equal:today'],
        ]);

        $tarjetaGiftCard->update($validated);
        return to_route('gift-cards.index')->with('success', 'Tarjeta actualizada.');
    }

    /**
     * Elimina (soft delete).
     */
    public function destroy(TarjetaGiftCard $tarjetaGiftCard)
    {
        $tarjetaGiftCard->delete();
        return to_route('gift-cards.index')->with('success', 'Tarjeta eliminada.');
    }

    /**
     * Procesar transacción (carga o cargo) en una tarjeta.
     */
    public function processTransaction(Request $request)
    {
        $request->validate([
            'codigo_unico' => 'required|string|exists:tarjeta_gift_cards,codigo_unico',
            'tipo' => 'required|in:carga,cargo',
            'monto' => 'required|numeric|min:0.01',
            'descripcion' => 'nullable|string|max:255',
        ]);

        $tarjeta = TarjetaGiftCard::where('codigo_unico', $request->codigo_unico)->firstOrFail();

        if ($tarjeta->estado !== 'activa') {
            return back()->withErrors(['codigo_unico' => 'La tarjeta no está activa.']);
        }

        $monto = $request->monto;
        $tipo = $request->tipo;
        $saldoAnterior = $tarjeta->saldo_actual;

        if ($tipo === 'cargo' && $saldoAnterior < $monto) {
            return back()->withErrors(['monto' => 'Saldo insuficiente para realizar el cargo.']);
        }

        $nuevoSaldo = $tipo === 'carga' ? $saldoAnterior + $monto : $saldoAnterior - $monto;

        DB::beginTransaction();
        try {
            // Actualizar saldo de la tarjeta
            $tarjeta->update(['saldo_actual' => $nuevoSaldo]);

            // Crear registro de movimiento
            $tarjeta->movimientos()->create([
                'tipo_movimiento' => $tipo,
                'monto' => $monto,
                'saldo_anterior' => $saldoAnterior,
                'saldo_nuevo' => $nuevoSaldo,
                'descripcion' => $request->descripcion,
                'user_id' => auth()->id(),
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al procesar la transacción.']);
        }

        return back()->with('success', ucfirst($tipo) . ' procesada exitosamente. Nuevo saldo: $' . number_format($nuevoSaldo, 2));
    }

    /**
     * Mostrar página de transacciones.
     */
    public function transactions(): Response
    {
        return Inertia::render('Transactions/Index');
    }

    /**
     * Mostrar historial de movimientos (global o por tarjeta).
     */
    public function movements(Request $request): Response
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 15);
        $tarjetaId = $request->input('tarjeta_id');

        $query = \App\Models\Movimiento::with(['tarjetaGiftCard:id,codigo_unico', 'user:id,name'])
            ->latest();

        // Filtrar por tarjeta específica si se proporciona
        if ($tarjetaId) {
            $query->where('tarjeta_gift_card_id', $tarjetaId);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('tarjetaGiftCard', fn($tq) => $tq->where('codigo_unico', 'like', "%{$search}%"))
                  ->orWhere('tipo_movimiento', 'like', "%{$search}%")
                  ->orWhere('descripcion', 'like', "%{$search}%");
            });
        }

        $movimientos = $query->paginate($perPage)->withQueryString();

        // Obtener todas las tarjetas para el selector
        $tarjetas = \App\Models\TarjetaGiftCard::select('id', 'codigo_unico')->get();

        return Inertia::render('Movements/Index', [
            'movimientos' => $movimientos,
            'tarjetas' => $tarjetas,
            'filters' => $request->only(['search', 'per_page', 'tarjeta_id']),
        ]);
    }

    /**
     * Endpoint para búsqueda por código (útil en React para escáner QR).
     */
    public function findByCodigo(string $codigo)
    {
        $tarjeta = TarjetaGiftCard::with(['cliente', 'user'])
            ->where('codigo_unico', $codigo)
            ->firstOrFail();

        return response()->json($tarjeta);
    }
}