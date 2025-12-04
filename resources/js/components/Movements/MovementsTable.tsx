import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index as movementsIndex } from '@/routes/movements';
import { router } from '@inertiajs/react';
import { Calendar, ChevronDown, Filter, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Movimiento {
    id: number;
    tipo_movimiento: 'carga' | 'cargo';
    monto: string;
    saldo_anterior: string;
    saldo_nuevo: string;
    descripcion: string | null;
    created_at: string;
    user?: { name: string };
    tarjeta_gift_card?: {
        codigo_unico: string;
        cliente?: { nombre: string; apellido_paterno: string; ci: string };
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface MovimientosResponse {
    data: Movimiento[];
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface MovementsTableProps {
    movimientos: MovimientosResponse;
    tarjetas: { id: number; codigo_unico: string }[];
    filters: {
        search?: string;
        tarjeta_id?: string;
        fecha_desde?: string;
        fecha_hasta?: string;
        tipo_movimiento?: string;
    };
}

export function MovementsTable({
    movimientos,
    tarjetas,
    filters,
}: MovementsTableProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTarjeta, setSelectedTarjeta] = useState(
        filters.tarjeta_id || 'all',
    );
    const [fechaDesde, setFechaDesde] = useState(filters.fecha_desde || '');
    const [fechaHasta, setFechaHasta] = useState(filters.fecha_hasta || '');
    const [tipoMovimiento, setTipoMovimiento] = useState(
        filters.tipo_movimiento || 'todos',
    );
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({
        fecha: true,
        tarjeta: true,
        cliente: true,
        ciCliente: false,
        tipo: true,
        monto: true,
        saldoAnterior: false,
        saldoNuevo: true,
        usuario: true,
        descripcion: true,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                movementsIndex().url,
                {
                    search: search || undefined,
                    tarjeta_id:
                        selectedTarjeta === 'all' ? undefined : selectedTarjeta,
                    fecha_desde: fechaDesde || undefined,
                    fecha_hasta: fechaHasta || undefined,
                    tipo_movimiento:
                        tipoMovimiento === 'todos' ? undefined : tipoMovimiento,
                },
                { preserveState: true, replace: true },
            );
        }, 400);
        return () => clearTimeout(timeout);
    }, [search, selectedTarjeta, fechaDesde, fechaHasta, tipoMovimiento]);

    const formatCurrency = (amount: string) =>
        `$${parseFloat(amount).toLocaleString('es-CL', { minimumFractionDigits: 2 })}`;

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url, {}, { preserveState: true, replace: true });
    };

    return (
        <div className="space-y-4">
            {/* Filtros Básicos */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative max-w-sm flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Código tarjeta..."
                        value={
                            selectedTarjeta === 'all'
                                ? ''
                                : tarjetas.find(
                                      (t) =>
                                          t.id.toString() === selectedTarjeta,
                                  )?.codigo_unico || ''
                        }
                        onChange={(e) => {
                            const val = e.target.value;
                            if (!val) return setSelectedTarjeta('all');
                            const found = tarjetas.find((t) =>
                                t.codigo_unico
                                    .toLowerCase()
                                    .includes(val.toLowerCase()),
                            );
                            setSelectedTarjeta(
                                found ? found.id.toString() : 'all',
                            );
                        }}
                        className="w-48"
                    />
                </div>
                <Collapsible
                    open={showAdvancedFilters}
                    onOpenChange={setShowAdvancedFilters}
                >
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            Filtros Avanzados
                        </Button>
                    </CollapsibleTrigger>
                </Collapsible>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Columnas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {Object.entries(columnVisibility).map(
                            ([key, visible]) => (
                                <DropdownMenuCheckboxItem
                                    key={key}
                                    checked={visible}
                                    onCheckedChange={(checked) =>
                                        setColumnVisibility((prev) => ({
                                            ...prev,
                                            [key]: checked,
                                        }))
                                    }
                                >
                                    {key
                                        .replace(/([A-Z])/g, ' $1')
                                        .replace(/^./, (str) =>
                                            str.toUpperCase(),
                                        )}
                                </DropdownMenuCheckboxItem>
                            ),
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Filtros Avanzados */}
            <Collapsible
                open={showAdvancedFilters}
                onOpenChange={setShowAdvancedFilters}
            >
                <CollapsibleContent className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Filtros Avanzados
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Fecha Desde</Label>
                                    <Input
                                        type="date"
                                        value={fechaDesde}
                                        onChange={(e) =>
                                            setFechaDesde(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Fecha Hasta</Label>
                                    <Input
                                        type="date"
                                        value={fechaHasta}
                                        onChange={(e) =>
                                            setFechaHasta(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tipo de Movimiento</Label>
                                    <Select
                                        value={tipoMovimiento}
                                        onValueChange={setTipoMovimiento}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todos">
                                                Todos
                                            </SelectItem>
                                            <SelectItem value="carga">
                                                Carga
                                            </SelectItem>
                                            <SelectItem value="cargo">
                                                Cargo
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setFechaDesde('');
                                        setFechaHasta('');
                                        setTipoMovimiento('');
                                    }}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Limpiar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Tabla */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columnVisibility.fecha && (
                                <TableHead>Fecha</TableHead>
                            )}
                            {columnVisibility.tarjeta && (
                                <TableHead>Tarjeta</TableHead>
                            )}
                            {columnVisibility.cliente && (
                                <TableHead>Cliente</TableHead>
                            )}
                            {columnVisibility.ciCliente && (
                                <TableHead>CI</TableHead>
                            )}
                            {columnVisibility.tipo && (
                                <TableHead>Tipo</TableHead>
                            )}
                            {columnVisibility.monto && (
                                <TableHead>Monto</TableHead>
                            )}
                            {columnVisibility.saldoAnterior && (
                                <TableHead>Saldo Ant.</TableHead>
                            )}
                            {columnVisibility.saldoNuevo && (
                                <TableHead>Saldo Nuevo</TableHead>
                            )}
                            {columnVisibility.usuario && (
                                <TableHead>Usuario</TableHead>
                            )}
                            {columnVisibility.descripcion && (
                                <TableHead>Descripción</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimientos.data.length ? (
                            movimientos.data.map((m) => (
                                <TableRow key={m.id}>
                                    {columnVisibility.fecha && (
                                        <TableCell className="text-sm">
                                            {formatDate(m.created_at)}
                                        </TableCell>
                                    )}
                                    {columnVisibility.tarjeta && (
                                        <TableCell className="font-mono font-medium">
                                            {m.tarjeta_gift_card
                                                ?.codigo_unico || '-'}
                                        </TableCell>
                                    )}
                                    {columnVisibility.cliente && (
                                        <TableCell>
                                            {m.tarjeta_gift_card?.cliente
                                                ? `${m.tarjeta_gift_card.cliente.nombre} ${m.tarjeta_gift_card.cliente.apellido_paterno}`
                                                : '—'}
                                        </TableCell>
                                    )}
                                    {columnVisibility.ciCliente && (
                                        <TableCell>
                                            {m.tarjeta_gift_card?.cliente?.ci ||
                                                '—'}
                                        </TableCell>
                                    )}
                                    {columnVisibility.tipo && (
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    m.tipo_movimiento ===
                                                    'carga'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {m.tipo_movimiento === 'carga'
                                                    ? 'Carga'
                                                    : 'Cargo'}
                                            </Badge>
                                        </TableCell>
                                    )}
                                    {columnVisibility.monto && (
                                        <TableCell className="font-medium">
                                            {m.tipo_movimiento === 'carga'
                                                ? '+'
                                                : '-'}
                                            {formatCurrency(m.monto)}
                                        </TableCell>
                                    )}
                                    {columnVisibility.saldoAnterior && (
                                        <TableCell>
                                            {formatCurrency(m.saldo_anterior)}
                                        </TableCell>
                                    )}
                                    {columnVisibility.saldoNuevo && (
                                        <TableCell className="font-semibold">
                                            {formatCurrency(m.saldo_nuevo)}
                                        </TableCell>
                                    )}
                                    {columnVisibility.usuario && (
                                        <TableCell>
                                            {m.user?.name || 'Sistema'}
                                        </TableCell>
                                    )}
                                    {columnVisibility.descripcion && (
                                        <TableCell className="max-w-xs truncate">
                                            {m.descripcion || '—'}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={10}
                                    className="py-4 text-center text-muted-foreground"
                                >
                                    No se encontraron movimientos.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación Shadcn style */}
            {movimientos.last_page > 1 && (
                <div className="flex items-center justify-between px-2 py-3">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {movimientos.total} resultados
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!movimientos.links[1]?.url}
                            onClick={() =>
                                handlePageChange(
                                    movimientos.links[1]?.url || null,
                                )
                            }
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                !movimientos.links[movimientos.links.length - 2]
                                    ?.url
                            }
                            onClick={() =>
                                handlePageChange(
                                    movimientos.links[
                                        movimientos.links.length - 2
                                    ]?.url || null,
                                )
                            }
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
