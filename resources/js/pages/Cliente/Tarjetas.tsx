import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mis Tarjetas',
        href: '/cliente/tarjetas',
    },
];

export default function Tarjetas() {
    const page = usePage();
    const { cliente } = page.props as any;

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis Tarjetas" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Mis Tarjetas de Regalo</h1>
                        <p className="text-muted-foreground">
                            Gestiona tus tarjetas de regalo
                        </p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {cliente.tarjetas_gift?.map((tarjeta: any) => (
                        <Card key={tarjeta.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Código: {tarjeta.codigo_unico}</CardTitle>
                                        <p className="text-sm text-muted-foreground">Tipo: {tarjeta.tipo || 'General'}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs ${tarjeta.estado === 'activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {tarjeta.estado}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3 mb-4">
                                    <div>
                                        <p className="text-sm font-medium">Saldo Inicial</p>
                                        <p className="text-lg font-bold">{formatCurrency(parseFloat(tarjeta.saldo_inicial))}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Saldo Actual</p>
                                        <p className="text-lg font-bold text-green-600">{formatCurrency(parseFloat(tarjeta.saldo_actual))}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Fecha Expiración</p>
                                        <p>{tarjeta.fecha_expiracion ? new Date(tarjeta.fecha_expiracion).toLocaleDateString('es-ES') : 'Sin expiración'}</p>
                                    </div>
                                </div>

                                <Button asChild variant="outline">
                                    <Link href={`/cliente/movimientos?cliente_id=${cliente.id}&tarjeta_id=${tarjeta.id}`}>
                                        Ver Movimientos
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {(!cliente.tarjetas_gift || cliente.tarjetas_gift.length === 0) && (
                        <Card>
                            <CardContent className="text-center py-8">
                                <p className="text-muted-foreground">No tienes tarjetas de regalo asignadas.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}