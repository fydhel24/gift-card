import { CreateCliente } from '@/components/Clientes/CreateCliente';
import AppLayout from '@/layouts/app-layout';
import { index as clientesIndex } from '@/routes/clientes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Clientes',
        href: clientesIndex().url,
    },
    {
        title: 'Crear Cliente',
        href: '#',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Nuevo Cliente" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Crear Nuevo Cliente</h1>
                        <p className="text-muted-foreground">
                            Registre un nuevo cliente en el sistema con su información completa.
                        </p>
                    </div>
                </div>

                <CreateCliente />
            </div>
        </AppLayout>
    );
}