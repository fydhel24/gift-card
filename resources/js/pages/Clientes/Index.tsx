import { Button } from '@/components/ui/button';
import { ClientesDataTable } from '@/components/Clientes/ClientesDataTable';
import AppLayout from '@/layouts/app-layout';
import { create as clientesCreate, index as clientesIndex } from '@/routes/clientes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Clientes',
        href: clientesIndex().url,
    },
];

export default function Index() {
    const page = usePage();
    const { clientes, filters } = page.props as any;

    const handleSearch = (search: string) => {
        router.get(clientesIndex().url, { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Clientes" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
                        <p className="text-muted-foreground">
                            Administre la información de sus clientes registrados en el sistema.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={clientesCreate().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Cliente
                        </Link>
                    </Button>
                </div>

                <ClientesDataTable
                    data={clientes}
                    onSearch={handleSearch}
                    initialSearch={filters.search || ''}
                />
            </div>
        </AppLayout>
    );
}