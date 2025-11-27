<?php

namespace App\Policies;

use App\Models\TarjetaGiftCard;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TarjetaGiftCardPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('ver tarjetas');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        // Admin puede ver todas las tarjetas
        if ($user->hasRole('admin')) {
            return $user->hasPermissionTo('ver tarjetas');
        }

        // Encargado puede ver todas las tarjetas
        if ($user->hasRole('encargado')) {
            return $user->hasPermissionTo('ver todas las tarjetas');
        }

        // Cliente solo puede ver sus propias tarjetas
        if ($user->hasRole('cliente')) {
            return $tarjetaGiftCard->cliente_id === $user->cliente?->id &&
                   $user->hasPermissionTo('ver tarjetas');
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('crear tarjetas');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        // Admin puede editar todas las tarjetas
        if ($user->hasRole('admin')) {
            return $user->hasPermissionTo('editar tarjetas');
        }

        // Encargado puede editar todas las tarjetas
        if ($user->hasRole('encargado')) {
            return $user->hasPermissionTo('editar tarjetas');
        }

        // Cliente no puede editar tarjetas
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        // Solo Admin puede eliminar tarjetas
        return $user->hasRole('admin') && $user->hasPermissionTo('eliminar tarjetas');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can associate a client to the gift card.
     */
    public function associateClient(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        // Admin y Encargado pueden asociar clientes
        return ($user->hasRole('admin') || $user->hasRole('encargado')) &&
               $user->hasPermissionTo('gestionar clientes');
    }

    /**
     * Determine whether the user can dissociate a client from the gift card.
     */
    public function dissociateClient(User $user, TarjetaGiftCard $tarjetaGiftCard): bool
    {
        // Admin y Encargado pueden desasociar clientes
        return ($user->hasRole('admin') || $user->hasRole('encargado')) &&
               $user->hasPermissionTo('gestionar clientes');
    }
}
