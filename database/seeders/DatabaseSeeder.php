<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // 1. Primero: crear roles y permisos
        $this->call(RolesAndPermissionsSeeder::class);

        // 2. Luego: crear usuarios administrativos y de prueba
        $this->call(AdminUserSeeder::class);

        // 3. Finalmente: crear datos de demostración (clientes, tarjetas, movimientos)
        $this->call(DemoDataSeeder::class);

        /* User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        ); */
    }
}
