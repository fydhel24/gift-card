<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos para tarjetas de regalo
        $giftCardPermissions = [
            'ver tarjetas',
            'crear tarjetas',
            'editar tarjetas',
            'eliminar tarjetas',
            'ver todas las tarjetas',
            'gestionar tarjetas',
        ];

        // Crear permisos para clientes
        $clientPermissions = [
            'ver clientes',
            'crear clientes',
            'editar clientes',
            'eliminar clientes',
            'ver todos los clientes',
            'gestionar clientes',
        ];

        // Crear permisos para transacciones
        $transactionPermissions = [
            'ver transacciones',
            'crear transacciones',
            'procesar transacciones',
            'ver todas las transacciones',
            'gestionar transacciones',
        ];

        // Crear permisos para usuarios (solo admin)
        $userPermissions = [
            'ver usuarios',
            'crear usuarios',
            'editar usuarios',
            'eliminar usuarios',
            'gestionar usuarios',
            'asignar roles',
        ];

        // Crear permisos para reportes
        $reportPermissions = [
            'ver reportes basicos',
            'ver reportes completos',
            'exportar reportes',
        ];

        // Crear permisos para configuración
        $configPermissions = [
            'ver configuracion',
            'editar configuracion',
            'gestionar configuracion',
        ];

        // Combinar todos los permisos
        $allPermissions = array_merge(
            $giftCardPermissions,
            $clientPermissions,
            $transactionPermissions,
            $userPermissions,
            $reportPermissions,
            $configPermissions
        );

        // Crear permisos en la base de datos
        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Crear roles y asignar permisos

        // 1. Rol ADMIN - Todos los permisos
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo($allPermissions);

        // 2. Rol ENCARGADO - Permisos limitados
        $encargadoRole = Role::firstOrCreate(['name' => 'encargado']);
        $encargadoPermissions = [
            // Tarjetas - limitado
            'ver tarjetas',
            'crear tarjetas',
            'editar tarjetas',
            'ver todas las tarjetas',

            // Clientes - limitado
            'ver clientes',
            'crear clientes',
            'editar clientes',
            'ver todos los clientes',

            // Transacciones - limitado
            'ver transacciones',
            'crear transacciones',
            'procesar transacciones',
            'ver todas las transacciones',

            // Reportes - básicos
            'ver reportes basicos',
        ];
        $encargadoRole->givePermissionTo($encargadoPermissions);

        // 3. Rol CLIENTE - Permisos mínimos
        $clienteRole = Role::firstOrCreate(['name' => 'cliente']);
        $clientePermissions = [
            // Solo puede ver sus propias tarjetas y transacciones
            'ver tarjetas', // solo las suyas
            'ver transacciones', // solo las suyas
            'procesar transacciones', // escanear QR
        ];
        $clienteRole->givePermissionTo($clientePermissions);

        $this->command->info('Roles y permisos creados exitosamente:');
        $this->command->info('- Admin: ' . count($allPermissions) . ' permisos');
        $this->command->info('- Encargado: ' . count($encargadoPermissions) . ' permisos');
        $this->command->info('- Cliente: ' . count($clientePermissions) . ' permisos');
    }
}
