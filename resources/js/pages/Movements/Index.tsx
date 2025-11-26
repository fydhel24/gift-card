import { MovementsTable } from '@/components/Movements/MovementsTable';
import AppLayout from '@/layouts/app-layout';
import { index as movementsIndex } from '@/routes/movements';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Historial de Movimientos',
        href: movementsIndex().url,
    },
];

export default function Index() {
    const page = usePage();
    const { movimientos, tarjetas, filters } = page.props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Movimientos" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Historial de Movimientos</h1>
                        <p className="text-muted-foreground">
                            {filters.tarjeta_id
                                ? `Mostrando movimientos de la tarjeta seleccionada`
                                : 'Selecciona una tarjeta para ver sus movimientos específicos o deja en blanco para ver todos'
                            }
                        </p>
                    </div>
                </div>

                <MovementsTable movimientos={movimientos} tarjetas={tarjetas} filters={filters} />
            </div>
        </AppLayout>
    );
}