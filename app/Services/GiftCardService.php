<?php

namespace App\Services;

use App\Models\TarjetaGiftCard;
use App\Models\Cliente;
use Illuminate\Validation\ValidationException;

class GiftCardService
{
    /**
     * Asocia un cliente a una tarjeta gift card existente.
     *
     * @param  \App\Models\TarjetaGiftCard  $tarjeta
     * @param  int  $clienteId
     * @return \App\Models\TarjetaGiftCard
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public static function associateClient(TarjetaGiftCard $tarjeta, int $clienteId): TarjetaGiftCard
    {
        $cliente = Cliente::find($clienteId);
        if (! $cliente) {
            throw ValidationException::withMessages(['cliente_id' => 'Cliente no encontrado.']);
        }

        $tarjeta->cliente_id = $cliente->id;
        $tarjeta->save();

        return $tarjeta->fresh();
    }

    /**
     * Desasocia el cliente actual de una tarjeta gift card.
     *
     * @param  \App\Models\TarjetaGiftCard  $tarjeta
     * @return \App\Models\TarjetaGiftCard
     */
    public static function dissociateClient(TarjetaGiftCard $tarjeta): TarjetaGiftCard
    {
        $tarjeta->cliente_id = null;
        $tarjeta->save();

        return $tarjeta->fresh();
    }
}