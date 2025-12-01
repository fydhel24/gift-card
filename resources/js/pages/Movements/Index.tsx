import { MovementsTable } from '@/components/Movements/MovementsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Movimientos" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Historial de Movimientos</h1>
                        <p className="text-muted-foreground">
                            Historial de todas las transacciones
                        </p>
                    </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Cargado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {formatCurrency((movimientos?.data || []).filter((m: any) => m.tipo_movimiento === 'carga').reduce((sum: number, m: any) => sum + parseFloat(m.monto), 0))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Gastado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {formatCurrency((movimientos?.data || []).filter((m: any) => m.tipo_movimiento === 'cargo').reduce((sum: number, m: any) => sum + parseFloat(m.monto), 0))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Saldo Neto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(
                                    (movimientos?.data || []).filter((m: any) => m.tipo_movimiento === 'carga').reduce((sum: number, m: any) => sum + parseFloat(m.monto), 0) -
                                    (movimientos?.data || []).filter((m: any) => m.tipo_movimiento === 'cargo').reduce((sum: number, m: any) => sum + parseFloat(m.monto), 0)
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <MovementsTable movimientos={movimientos} tarjetas={tarjetas} filters={filters} />
            </div>
        </AppLayout>
    );
}