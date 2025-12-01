import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mis Movimientos',
        href: '/cliente/movimientos',
    },
];

export default function Movimientos() {
    const page = usePage();
    const { cliente, movimientos, filters } = page.props as any;

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    const selectedCard = cliente.tarjetas_gift?.find((t: any) => t.id == filters.tarjeta_id);
    const title = selectedCard ? `Movimientos de ${selectedCard.codigo_unico}` : 'Mis Movimientos';
    const subtitle = selectedCard ? 'Historial de transacciones de esta tarjeta' : 'Historial de todas tus transacciones';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-muted-foreground">
                            {subtitle}
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

                </div>

                {/* Tabla de movimientos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Movimientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Tarjeta</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead>Saldo Anterior</TableHead>
                                        <TableHead>Saldo Nuevo</TableHead>
                                        <TableHead>Descripción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(movimientos?.data || []).map((movimiento: any) => (
                                        <TableRow key={movimiento.id}>
                                            <TableCell>
                                                {new Date(movimiento.created_at).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell>{movimiento.tarjeta_gift_card?.codigo_unico}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-xs ${movimiento.tipo_movimiento === 'carga' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {movimiento.tipo_movimiento}
                                                </span>
                                            </TableCell>
                                            <TableCell className={movimiento.tipo_movimiento === 'carga' ? 'text-green-600' : 'text-red-600'}>
                                                {movimiento.tipo_movimiento === 'carga' ? '+' : '-'}{formatCurrency(parseFloat(movimiento.monto))}
                                            </TableCell>
                                            <TableCell>{formatCurrency(parseFloat(movimiento.saldo_anterior))}</TableCell>
                                            <TableCell>{formatCurrency(parseFloat(movimiento.saldo_nuevo))}</TableCell>
                                            <TableCell>{movimiento.descripcion || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Paginación */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-700">
                                Mostrando {movimientos?.data?.length || 0} de {movimientos?.meta?.total || 0} movimientos
                            </div>
                            <div className="flex space-x-1">
                                {movimientos.links.map((link: any, index: number) => (
                                    <button
                                        key={index}
                                        className={`px-3 py-1 text-sm border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        disabled={!link.url}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}