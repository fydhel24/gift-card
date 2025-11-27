<?php

namespace App\Policies;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ClientePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('ver clientes');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Cliente $cliente): bool
    {
        // Admin puede ver todos los clientes
        if ($user->hasRole('admin')) {
            return $user->hasPermissionTo('ver clientes');
        }

        // Encargado puede ver todos los clientes
        if ($user->hasRole('encargado')) {
            return $user->hasPermissionTo('ver todos los clientes');
        }

        // Cliente solo puede ver su propio perfil
        if ($user->hasRole('cliente')) {
            $userCliente = $user->cliente()->first();
            return $userCliente && $cliente->id === $userCliente->id &&
                   $user->hasPermissionTo('ver clientes');
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Solo Admin y Encargado pueden crear clientes
        return ($user->hasRole('admin') || $user->hasRole('encargado')) &&
               $user->hasPermissionTo('crear clientes');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Cliente $cliente): bool
    {
        // Admin puede editar todos los clientes
        if ($user->hasRole('admin')) {
            return $user->hasPermissionTo('editar clientes');
        }

        // Encargado puede editar todos los clientes
        if ($user->hasRole('encargado')) {
            return $user->hasPermissionTo('editar clientes');
        }

        // Cliente solo puede editar su propio perfil
        if ($user->hasRole('cliente')) {
            return $cliente->id === $user->cliente?->id &&
                   $user->hasPermissionTo('editar clientes');
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Cliente $cliente): bool
    {
        // Solo Admin puede eliminar clientes
        return $user->hasRole('admin') && $user->hasPermissionTo('eliminar clientes');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Cliente $cliente): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Cliente $cliente): bool
    {
        return $user->hasRole('admin');
    }
}
