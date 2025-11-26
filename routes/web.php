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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Clientes
    Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes.index');
    Route::get('/clientes/create', [ClienteController::class, 'create'])->name('clientes.create');
    Route::post('/clientes', [ClienteController::class, 'store'])->name('clientes.store');
    Route::get('/clientes/{cliente}', [ClienteController::class, 'show'])->name('clientes.show');
    Route::get('/clientes/{cliente}/edit', [ClienteController::class, 'edit'])->name('clientes.edit');
    Route::put('/clientes/{cliente}', [ClienteController::class, 'update'])->name('clientes.update');
    Route::delete('/clientes/{cliente}', [ClienteController::class, 'destroy'])->name('clientes.destroy');

    //para las tarjetas de regalo
    Route::get('/gift-cards', [TarjetaGiftCardController::class, 'index'])->name('gift-cards.index');
    Route::get('/gift-cards/create', [TarjetaGiftCardController::class, 'create'])->name('gift-cards.create');
    Route::post('/gift-cards', [TarjetaGiftCardController::class, 'store'])->name('gift-cards.store');
    Route::get('/gift-cards/{tarjetaGiftCard}', [TarjetaGiftCardController::class, 'show'])->name('gift-cards.show');
    Route::post('/gift-cards/{tarjetaGiftCard}/associate-client', [TarjetaGiftCardController::class, 'associateClient'])->name('gift-cards.associate-client');
    Route::post('/gift-cards/{tarjetaGiftCard}/dissociate-client', [TarjetaGiftCardController::class, 'dissociateClient'])->name('gift-cards.dissociate-client');
    Route::get('/gift-cards/{tarjetaGiftCard}/edit', [TarjetaGiftCardController::class, 'edit'])->name('gift-cards.edit');
    Route::put('/gift-cards/{tarjetaGiftCard}', [TarjetaGiftCardController::class, 'update'])->name('gift-cards.update');
    Route::delete('/gift-cards/{tarjetaGiftCard}', [TarjetaGiftCardController::class, 'destroy'])->name('gift-cards.destroy');

    // Transacciones
    Route::get('/transactions', [TarjetaGiftCardController::class, 'transactions'])->name('transactions.index');
    Route::post('/transactions', [TarjetaGiftCardController::class, 'processTransaction'])->name('transactions.process');

    // Movimientos/Historial
    Route::get('/movements', [TarjetaGiftCardController::class, 'movements'])->name('movements.index');

});
//para las tarjetas de regalo
Route::get('/api/gift-cards/by-codigo/{codigo}', [TarjetaGiftCardController::class, 'findByCodigo']);
require __DIR__.'/settings.php';
