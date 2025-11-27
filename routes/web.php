<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\TarjetaGiftCardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TarjetaGiftCardController::class, 'dashboard'])->name('dashboard');

    // Clientes - Checks in controller
    Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes.index');
    Route::get('/clientes/create', [ClienteController::class, 'create'])->name('clientes.create');
    Route::post('/clientes', [ClienteController::class, 'store'])->name('clientes.store');
    Route::get('/clientes/{cliente}/edit', [ClienteController::class, 'edit'])->name('clientes.edit');
    Route::put('/clientes/{cliente}', [ClienteController::class, 'update'])->name('clientes.update');
    Route::delete('/clientes/{cliente}', [ClienteController::class, 'destroy'])->name('clientes.destroy');

    // Cliente puede ver su propio perfil
    Route::get('/clientes/{cliente}', [ClienteController::class, 'show'])->name('clientes.show');
    Route::get('/clientes/mi-perfil', [ClienteController::class, 'miPerfil'])->name('clientes.mi-perfil');

    // Dashboard específico para clientes
    Route::middleware(['role:cliente'])->group(function () {
        Route::get('/cliente/tarjetas', [App\Http\Controllers\ClienteDashboardController::class, 'tarjetas'])->name('cliente.tarjetas');
        Route::get('/cliente/movimientos', [App\Http\Controllers\ClienteDashboardController::class, 'movimientos'])->name('cliente.movimientos');
    });

    // Funciones específicas para encargado
    Route::middleware(['role:encargado'])->group(function () {
        Route::get('/encargado/asignar-tarjetas', [TarjetaGiftCardController::class, 'asignarTarjetas'])->name('encargado.asignar-tarjetas');
        Route::post('/encargado/asignar-tarjeta/{tarjeta}', [TarjetaGiftCardController::class, 'asignarTarjetaACliente'])->name('encargado.asignar-tarjeta');
    });

    //para las tarjetas de regalo
    // Index solo para staff
    Route::middleware(['role:admin,encargado'])->group(function () {
        Route::get('/gift-cards', [TarjetaGiftCardController::class, 'index'])->name('gift-cards.index');
    });

    // Show para todos con policy
    Route::middleware(['role:admin|encargado|cliente'])->group(function () {
        Route::get('/gift-cards/{tarjetaGiftCard}', [TarjetaGiftCardController::class, 'show'])->name('gift-cards.show');
    });

    // Rutas que requieren permisos específicos para crear/editar tarjetas
    Route::middleware(['can:crear tarjetas'])->group(function () {
        Route::get('/gift-cards/create', [TarjetaGiftCardController::class, 'create'])->name('gift-cards.create');
        Route::post('/gift-cards', [TarjetaGiftCardController::class, 'store'])->name('gift-cards.store');
    });

    // Rutas que requieren permisos para editar tarjetas
    Route::middleware(['can:editar tarjetas'])->group(function () {
        Route::get('/gift-cards/{tarjetaGiftCard}/edit', [TarjetaGiftCardController::class, 'edit'])->name('gift-cards.edit');
        Route::put('/gift-cards/{tarjetaGiftCard}', [TarjetaGiftCardController::class, 'update'])->name('gift-cards.update');
    });

    // Rutas que requieren permisos para gestionar clientes en tarjetas
    Route::middleware(['can:gestionar clientes'])->group(function () {
        Route::post('/gift-cards/{tarjetaGiftCard}/associate-client', [TarjetaGiftCardController::class, 'associateClient'])->name('gift-cards.associate-client');
        Route::post('/gift-cards/{tarjetaGiftCard}/dissociate-client', [TarjetaGiftCardController::class, 'dissociateClient'])->name('gift-cards.dissociate-client');
    });

    // Solo admin puede eliminar tarjetas
    Route::middleware(['role:admin'])->group(function () {
        Route::delete('/gift-cards/{tarjetaGiftCard}', [TarjetaGiftCardController::class, 'destroy'])->name('gift-cards.destroy');
    });

    // Transacciones
    Route::get('/transactions', [TarjetaGiftCardController::class, 'transactions'])->name('transactions.index');
    Route::post('/transactions', [TarjetaGiftCardController::class, 'processTransaction'])->name('transactions.process');

    // Movimientos/Historial - Solo staff
    Route::middleware(['role:admin,encargado'])->group(function () {
        Route::get('/movements', [TarjetaGiftCardController::class, 'movements'])->name('movements.index');
    });

    // Usuarios - Solo admin
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/users', [App\Http\Controllers\UserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}/edit', [App\Http\Controllers\UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [App\Http\Controllers\UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [App\Http\Controllers\UserController::class, 'destroy'])->name('users.destroy');
    });

});
//para las tarjetas de regalo
Route::get('/api/gift-cards/by-codigo/{codigo}', [TarjetaGiftCardController::class, 'findByCodigo']);
require __DIR__.'/settings.php';
