<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ClienteController extends Controller
{
    /**
     * Muestra lista paginada y buscable de clientes.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 15);
        $estado = $request->input('estado');
        $fechaDesde = $request->input('fecha_desde');
        $fechaHasta = $request->input('fecha_hasta');

        $query = Cliente::with('user:id,name');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                  ->orWhere('apellido_paterno', 'like', "%{$search}%")
                  ->orWhere('apellido_materno', 'like', "%{$search}%")
                  ->orWhere('ci', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('celular', 'like', "%{$search}%");
            });
        }

        // Filtro por estado
        if ($estado !== null) {
            $query->where('activo', $estado === 'activo');
        }

        // Filtros de fecha
        if ($fechaDesde) {
            $query->whereDate('created_at', '>=', $fechaDesde);
        }
        if ($fechaHasta) {
            $query->whereDate('created_at', '<=', $fechaHasta);
        }

        $clientes = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
            'filters' => $request->only(['search', 'per_page', 'estado', 'fecha_desde', 'fecha_hasta']),
        ]);
    }

    /**
     * Muestra formulario para crear cliente.
     */
    public function create(): Response
    {
        return Inertia::render('Clientes/Create');
    }

    /**
     * Crea un nuevo cliente.
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasRole(['admin', 'encargado'])) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'apellido_paterno' => ['required', 'string', 'max:255'],
            'apellido_materno' => ['nullable', 'string', 'max:255'],
            'ci' => ['required', 'string', 'max:20', Rule::unique('clientes')],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('clientes')],
            'celular' => ['nullable', 'string', 'max:20'],
            'direccion' => ['nullable', 'string', 'max:500'],
            'fecha_nacimiento' => ['nullable', 'date', 'before:today'],
            'genero' => ['nullable', Rule::in(['M', 'F'])],
            'activo' => ['boolean'],
        ], [
            'ci.unique' => 'El CI ya está registrado.',
            'email.unique' => 'El email ya está registrado.',
            'email.email' => 'El email no es válido.',
            'fecha_nacimiento.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
            'genero.in' => 'El género debe ser M o F.',
        ]);

        DB::beginTransaction();
        try {
            // Crear usuario para el cliente
            $username = $validated['ci']; // Usar CI como username único
            $password = $validated['ci']; // Usar CI como password

            $user = \App\Models\User::create([
                'name' => $validated['nombre'] . ' ' . $validated['apellido_paterno'],
                'email' => $validated['email'] ?: $username . '@cliente.com', // Email único
                'password' => \Illuminate\Support\Facades\Hash::make($password),
                'email_verified_at' => now(),
            ]);
            $user->assignRole('cliente');

            $validated['user_id'] = $user->id;

            $cliente = Cliente::create($validated);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al crear el cliente: ' . $e->getMessage()]);
        }

        return to_route('clientes.show', $cliente)->with('success', 'Cliente creado exitosamente. Usuario: ' . $username . ', Contraseña: ' . $password);
    }

    /**
     * Muestra detalles del cliente.
     */
    public function show(Cliente $cliente): Response
    {
        if (!auth()->user()->hasAnyRole(['admin', 'encargado', 'cliente'])) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        $cliente->load(['user', 'tarjetasGift' => function($q) {
            $q->with('user:id,name')->latest();
        }]);

        return Inertia::render('Clientes/Show', [
            'cliente' => $cliente,
        ]);
    }

    /**
     * Formulario de edición.
     */
    public function edit(Cliente $cliente): Response
    {
        $this->authorize('update', $cliente);

        return Inertia::render('Clientes/Edit', [
            'cliente' => $cliente->load('user'),
        ]);
    }

    /**
     * Actualiza cliente.
     */
    public function update(Request $request, Cliente $cliente)
    {
        $this->authorize('update', $cliente);

        // Si solo se envía 'activo', es una actualización parcial del estado
        if ($request->has('activo') && count($request->all()) === 2) { // _method + activo
            $validated = $request->validate([
                'activo' => ['boolean'],
            ]);

            $cliente->update($validated);

            return back()->with('success', 'Estado del cliente actualizado.');
        }

        // Validación completa para edición normal
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'apellido_paterno' => ['required', 'string', 'max:255'],
            'apellido_materno' => ['nullable', 'string', 'max:255'],
            'ci' => ['required', 'string', 'max:20', Rule::unique('clientes')->ignore($cliente->id)],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('clientes')->ignore($cliente->id)],
            'celular' => ['nullable', 'string', 'max:20'],
            'direccion' => ['nullable', 'string', 'max:500'],
            'fecha_nacimiento' => ['nullable', 'date', 'before:today'],
            'genero' => ['nullable', Rule::in(['M', 'F'])],
            'activo' => ['boolean'],
        ]);

        $cliente->update($validated);

        return to_route('clientes.index')->with('success', 'Cliente actualizado exitosamente.');
    }

    /**
     * Elimina cliente (soft delete).
     */
    public function destroy(Cliente $cliente)
    {
        $this->authorize('delete', $cliente);

        $cliente->delete();
        return to_route('clientes.index')->with('success', 'Cliente eliminado exitosamente.');
    }

    /**
     * Redirige al perfil del cliente actual.
     */
    public function miPerfil()
    {
        $cliente = auth()->user()->cliente()->first();
        if (!$cliente) {
            abort(404);
        }
        return redirect()->route('clientes.show', $cliente);
    }
}