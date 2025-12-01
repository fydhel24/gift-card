<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuario admin si no existe
        $admin = User::firstOrCreate(
            ['email' => 'admin@giftcard.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Asignar rol de admin
        $admin->assignRole('admin');

        $this->command->info('Usuario admin creado:');
        $this->command->info('Email: admin@giftcard.com');
        $this->command->info('Password: password');
        $this->command->info('Rol: admin');

        // Crear usuario encargado de prueba
        $encargado = User::firstOrCreate(
            ['email' => 'encargado@giftcard.com'],
            [
                'name' => 'Encargado de Tienda',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $encargado->assignRole('encargado');

        $this->command->info('');
        $this->command->info('Usuario encargado creado:');
        $this->command->info('Email: encargado@giftcard.com');
        $this->command->info('Password: password');
        $this->command->info('Rol: encargado');

        // Crear usuario cliente de prueba
        $clienteUser = User::firstOrCreate(
            ['email' => 'cliente@giftcard.com'],
            [
                'name' => 'Cliente Ejemplo',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $clienteUser->assignRole('cliente');

        // Crear registro de cliente asociado
        \App\Models\Cliente::firstOrCreate(
            ['user_id' => $clienteUser->id],
            [
                'nombre' => 'Juan',
                'apellido_paterno' => 'Pérez',
                'apellido_materno' => 'Gómez',
                'ci' => '12345678',
                'email' => 'cliente@giftcard.com',
                'celular' => '77712345',
                'direccion' => 'Calle Ficticia 123',
                'fecha_nacimiento' => '1990-01-01',
                'genero' => 'M',
                'activo' => true,
            ]
        );

        $this->command->info('');
        $this->command->info('Usuario cliente creado:');
        $this->command->info('Email: cliente@giftcard.com');
        $this->command->info('Password: password');
        $this->command->info('Rol: cliente');
    }
}
