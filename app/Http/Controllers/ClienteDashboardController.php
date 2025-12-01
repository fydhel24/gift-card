<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClienteDashboardController extends Controller
{
    /**
     * Muestra las tarjetas del cliente (actual o especificado).
     */
    public function tarjetas(Request $request): Response
    {
        $user = auth()->user();
        $clienteId = $request->input('cliente_id');

        if ($clienteId && ($user->hasRole('admin') || $user->hasRole('encargado'))) {
            $cliente = \App\Models\Cliente::with(['tarjetasGift' => function($q) {
                $q->latest();
            }])->findOrFail($clienteId);
        } else {
            $cliente = $user->cliente()->with(['tarjetasGift' => function($q) {
                $q->latest();
            }])->first();

            if (!$cliente) {
                abort(404);
            }
        }

        return Inertia::render('Cliente/Tarjetas', [
            'cliente' => $cliente,
        ]);
    }

    /**
     * Muestra los movimientos del cliente (actual o especificado).
     */
    public function movimientos(Request $request): Response
    {
        $user = auth()->user();
        $clienteId = $request->input('cliente_id');

        if ($clienteId && ($user->hasRole('admin') || $user->hasRole('encargado'))) {
            $cliente = \App\Models\Cliente::with(['tarjetasGift'])->findOrFail($clienteId);
        } else {
            $cliente = $user->cliente()->with(['tarjetasGift'])->first();

            if (!$cliente) {
                abort(404);
            }
        }

        $search = $request->input('search');
        $perPage = $request->input('per_page', 15);
        $tarjetaId = $request->input('tarjeta_id');

        $query = \App\Models\Movimiento::with(['tarjetaGiftCard', 'user'])
            ->whereHas('tarjetaGiftCard', function($q) use ($cliente) {
                $q->where('cliente_id', $cliente->id);
            })
            ->latest();

        // Filtrar por tarjeta específica si se proporciona
        if ($tarjetaId) {
            $query->where('tarjeta_gift_card_id', $tarjetaId);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tipo_movimiento', 'like', "%{$search}%")
                  ->orWhere('descripcion', 'like', "%{$search}%");
            });
        }

        $movimientos = $query->paginate($perPage)->withQueryString();

        // Obtener tarjetas del cliente para el filtro
        $tarjetas = \App\Models\TarjetaGiftCard::where('cliente_id', $cliente->id)
            ->select('id', 'codigo_unico')
            ->get();

        return Inertia::render('Cliente/Movimientos', [
            'cliente' => $cliente,
            'movimientos' => $movimientos,
            'tarjetas' => $tarjetas,
            'filters' => $request->only(['search', 'per_page', 'tarjeta_id']),
        ]);
    }
}