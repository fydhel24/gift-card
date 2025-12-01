<?php

namespace App\Providers;

use App\Models\Cliente;
use App\Models\TarjetaGiftCard;
use App\Policies\ClientePolicy;
use App\Policies\TarjetaGiftCardPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Registrar políticas
        Gate::policy(TarjetaGiftCard::class, TarjetaGiftCardPolicy::class);
        Gate::policy(Cliente::class, ClientePolicy::class);
    }
}
