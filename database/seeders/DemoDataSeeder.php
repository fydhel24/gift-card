<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Movimiento;
use App\Models\TarjetaGiftCard;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear más usuarios y clientes
        $clientesData = [
            [
                'user' => ['name' => 'María López', 'email' => 'maria@example.com'],
                'cliente' => [
                    'nombre' => 'María',
                    'apellido_paterno' => 'López',
                    'apellido_materno' => 'García',
                    'ci' => '87654321',
                    'email' => 'maria@example.com',
                    'celular' => '77765432',
                    'direccion' => 'Av. Principal 456',
                    'fecha_nacimiento' => '1985-03-15',
                    'genero' => 'F',
                ],
            ],
            [
                'user' => ['name' => 'Carlos Rodríguez', 'email' => 'carlos@example.com'],
                'cliente' => [
                    'nombre' => 'Carlos',
                    'apellido_paterno' => 'Rodríguez',
                    'apellido_materno' => 'Martínez',
                    'ci' => '11223344',
                    'email' => 'carlos@example.com',
                    'celular' => '77711223',
                    'direccion' => 'Calle Secundaria 789',
                    'fecha_nacimiento' => '1990-07-22',
                    'genero' => 'M',
                ],
            ],
            [
                'user' => ['name' => 'Ana Torres', 'email' => 'ana@example.com'],
                'cliente' => [
                    'nombre' => 'Ana',
                    'apellido_paterno' => 'Torres',
                    'apellido_materno' => 'Vargas',
                    'ci' => '55667788',
                    'email' => 'ana@example.com',
                    'celular' => '77755667',
                    'direccion' => 'Plaza Central 101',
                    'fecha_nacimiento' => '1988-11-30',
                    'genero' => 'F',
                ],
            ],
            [
                'user' => ['name' => 'Luis Fernández', 'email' => 'luis@example.com'],
                'cliente' => [
                    'nombre' => 'Luis',
                    'apellido_paterno' => 'Fernández',
                    'apellido_materno' => 'Ruiz',
                    'ci' => '33445566',
                    'email' => 'luis@example.com',
                    'celular' => '77733445',
                    'direccion' => 'Barrio Nuevo 202',
                    'fecha_nacimiento' => '1992-05-10',
                    'genero' => 'M',
                ],
            ],
            [
                'user' => ['name' => 'Sofia Morales', 'email' => 'sofia@example.com'],
                'cliente' => [
                    'nombre' => 'Sofia',
                    'apellido_paterno' => 'Morales',
                    'apellido_materno' => 'Castro',
                    'ci' => '77889900',
                    'email' => 'sofia@example.com',
                    'celular' => '77777889',
                    'direccion' => 'Zona Norte 303',
                    'fecha_nacimiento' => '1987-09-05',
                    'genero' => 'F',
                ],
            ],
        ];

        foreach ($clientesData as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['user']['email']],
                [
                    'name' => $data['user']['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole('cliente');

            Cliente::firstOrCreate(
                ['user_id' => $user->id],
                array_merge($data['cliente'], ['activo' => true])
            );
        }

        // Crear tarjetas de regalo para los clientes
        $clientes = Cliente::all();
        $tipos = ['Cumpleaños', 'Navidad', 'Aniversario', 'Regalo', 'Promoción'];

        foreach ($clientes as $cliente) {
            $numTarjetas = rand(1, 3);
            for ($i = 0; $i < $numTarjetas; $i++) {
                $saldoInicial = rand(50, 500);
                $tarjeta = TarjetaGiftCard::create([
                    'codigo_unico' => 'GC' . strtoupper(uniqid()),
                    'saldo_inicial' => $saldoInicial,
                    'saldo_actual' => $saldoInicial,
                    'estado' => 'activa',
                    'tipo' => $tipos[array_rand($tipos)],
                    'cliente_id' => $cliente->id,
                    'user_id' => $cliente->user_id,
                    'fecha_expiracion' => now()->addMonths(rand(6, 24))->format('Y-m-d'),
                ]);

                // Crear algunos movimientos
                $numMovimientos = rand(2, 5);
                $saldoActual = $saldoInicial;
                for ($j = 0; $j < $numMovimientos; $j++) {
                    $esCarga = rand(0, 1);
                    if ($esCarga || $saldoActual == 0) {
                        $monto = rand(20, 100);
                        $tipo = 'carga';
                        $saldoNuevo = $saldoActual + $monto;
                    } else {
                        $monto = rand(10, min(50, $saldoActual));
                        $tipo = 'cargo';
                        $saldoNuevo = $saldoActual - $monto;
                    }

                    Movimiento::create([
                        'tarjeta_gift_card_id' => $tarjeta->id,
                        'tipo_movimiento' => $tipo,
                        'monto' => $monto,
                        'saldo_anterior' => $saldoActual,
                        'saldo_nuevo' => $saldoNuevo,
                        'descripcion' => $tipo === 'carga' ? 'Carga de saldo' : 'Compra realizada',
                        'user_id' => rand(0, 1) ? 1 : $cliente->user_id, // Admin o cliente
                    ]);

                    $saldoActual = $saldoNuevo;
                }

                // Actualizar saldo actual de la tarjeta
                $tarjeta->update(['saldo_actual' => $saldoActual]);
            }
        }

        // Crear algunas tarjetas sin asignar a clientes
        for ($i = 0; $i < 5; $i++) {
            TarjetaGiftCard::create([
                'codigo_unico' => 'GC' . strtoupper(uniqid()),
                'saldo_inicial' => rand(100, 300),
                'saldo_actual' => rand(100, 300),
                'estado' => 'activa',
                'tipo' => $tipos[array_rand($tipos)],
                'user_id' => 1, // Admin
                'fecha_expiracion' => now()->addMonths(rand(3, 12))->format('Y-m-d'),
            ]);
        }

        $this->command->info('Datos de demostración creados exitosamente.');
        $this->command->info('Usuarios clientes:');
        foreach ($clientesData as $data) {
            $this->command->info('- ' . $data['user']['email'] . ' (password: password)');
        }
    }
}