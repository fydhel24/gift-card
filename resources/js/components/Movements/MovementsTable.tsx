import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { index as movementsIndex } from '@/routes/movements';
import { Search, Filter, Calendar, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MovementsTableProps {
    movimientos: any;
    tarjetas: any[];
    filters: {
        search?: string;
        per_page?: number;
        tarjeta_id?: string;
        fecha_desde?: string;
        fecha_hasta?: string;
        tipo_movimiento?: string;
    };
}

export function MovementsTable({ movimientos, tarjetas, filters }: MovementsTableProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTarjeta, setSelectedTarjeta] = useState(filters.tarjeta_id || 'all');
    const [fechaDesde, setFechaDesde] = useState(filters.fecha_desde || '');
    const [fechaHasta, setFechaHasta] = useState(filters.fecha_hasta || '');
    const [tipoMovimiento, setTipoMovimiento] = useState(filters.tipo_movimiento || '');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(movementsIndex().url, {
                search,
                tarjeta_id: selectedTarjeta === 'all' ? undefined : selectedTarjeta,
                fecha_desde: fechaDesde || undefined,
                fecha_hasta: fechaHasta || undefined,
                tipo_movimiento: tipoMovimiento || undefined,
            }, { preserveState: true });
        }, 400);
        return () => clearTimeout(timeout);
    }, [search, selectedTarjeta, fechaDesde, fechaHasta, tipoMovimiento]);

    const formatCurrency = (amount: string) => `$${parseFloat(amount).toFixed(2)}`;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por código, tipo o descripción..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedTarjeta} onValueChange={(value) => setSelectedTarjeta(value === "all" ? "" : value)}>
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Seleccionar tarjeta (todas)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las tarjetas</SelectItem>
                            {tarjetas.map((tarjeta: any) => (
                                <SelectItem key={tarjeta.id} value={tarjeta.id.toString()}>
                                    {tarjeta.codigo_unico}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Filtros Avanzados
                        </Button>
                    </CollapsibleTrigger>
                </Collapsible>
            </div>

            <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                <CollapsibleContent className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Filtros Avanzados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fecha_desde">Fecha Desde</Label>
                                    <Input
                                        id="fecha_desde"
                                        type="date"
                                        value={fechaDesde}
                                        onChange={(e) => setFechaDesde(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fecha_hasta">Fecha Hasta</Label>
                                    <Input
                                        id="fecha_hasta"
                                        type="date"
                                        value={fechaHasta}
                                        onChange={(e) => setFechaHasta(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tipo_movimiento">Tipo de Movimiento</Label>
                                    <Select value={tipoMovimiento} onValueChange={setTipoMovimiento}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos los tipos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Todos los tipos</SelectItem>
                                            <SelectItem value="carga">Cargas</SelectItem>
                                            <SelectItem value="cargo">Cargos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setFechaDesde('');
                                        setFechaHasta('');
                                        setTipoMovimiento('');
                                    }}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Limpiar Filtros
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

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
                            <TableHead>Usuario</TableHead>
                            <TableHead>Descripción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimientos.data && movimientos.data.map((movimiento: any) => (
                            <TableRow key={movimiento.id}>
                                <TableCell className="text-sm">
                                    {formatDate(movimiento.created_at)}
                                </TableCell>
                                <TableCell className="font-mono font-medium">
                                    {movimiento.tarjeta_gift_card.codigo_unico}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={movimiento.tipo_movimiento === 'carga' ? 'default' : 'secondary'}
                                    >
                                        {movimiento.tipo_movimiento === 'carga' ? 'Carga' : 'Cargo'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {movimiento.tipo_movimiento === 'carga' ? '+' : '-'}{formatCurrency(movimiento.monto)}
                                </TableCell>
                                <TableCell>
                                    {formatCurrency(movimiento.saldo_anterior)}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {formatCurrency(movimiento.saldo_nuevo)}
                                </TableCell>
                                <TableCell>
                                    {movimiento.user?.name || 'Sistema'}
                                </TableCell>
                                <TableCell className="max-w-xs truncate">
                                    {movimiento.descripcion || '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {movimientos.meta && movimientos.meta.last_page > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Mostrando {movimientos.data.length} de {movimientos.meta.total} movimientos
                    </div>
                    <div className="flex space-x-1">
                        {movimientos.links && movimientos.links.map((link: any, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                            >
                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}