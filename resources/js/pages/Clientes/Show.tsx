import { ShowCliente } from '@/components/Clientes/ShowCliente';
import AppLayout from '@/layouts/app-layout';
import { index as clientesIndex } from '@/routes/clientes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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
        title: 'Detalles del Cliente',
        href: '#',
    },
];

export default function Show() {
    const { cliente } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detalles del Cliente" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Detalles del Cliente</h1>
                        <p className="text-muted-foreground">
                            Información completa del cliente registrado.
                        </p>
                    </div>
                </div>

                <ShowCliente cliente={cliente} />
            </div>
        </AppLayout>
    );
}