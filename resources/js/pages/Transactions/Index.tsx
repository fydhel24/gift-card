import { TransactionForm } from '@/components/Transactions/TransactionForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Transacciones',
        href: '#',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Procesar Transacciones" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Procesar Transacciones</h1>
                        <p className="text-muted-foreground">
                            Busque una tarjeta por código y realice cargas o cargos.
                        </p>
                    </div>
                </div>

                <TransactionForm />
            </div>
        </AppLayout>
    );
}