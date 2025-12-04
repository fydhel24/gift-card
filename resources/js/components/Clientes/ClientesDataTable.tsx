import { Cliente, PaginatedClientes } from '@/types/giftCard';
import { show, edit, destroy } from '@/routes/clientes';
import { Link, router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RoleGuard } from '@/components/RoleGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEffect, useState } from 'react';
import { Edit, Eye, Trash2, CreditCard, History, Search, Filter, Calendar, X } from 'lucide-react';

interface DataTableProps {
  data: PaginatedClientes;
  onSearch: (value: string) => void;
  initialSearch?: string;
  filters: {
    search?: string;
    estado?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
  };
}

export function ClientesDataTable({ data, onSearch, initialSearch = '', filters }: DataTableProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedEstado, setSelectedEstado] = useState(filters.estado || '');
  const [fechaDesde, setFechaDesde] = useState(filters.fecha_desde || '');
  const [fechaHasta, setFechaHasta] = useState(filters.fecha_hasta || '');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params: any = { search };
      if (selectedEstado !== 'todos') params.estado = selectedEstado;
      if (fechaDesde) params.fecha_desde = fechaDesde;
      if (fechaHasta) params.fecha_hasta = fechaHasta;
      router.get(window.location.pathname, params, { preserveState: true });
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, selectedEstado, fechaDesde, fechaHasta]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, apellido, CI o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedEstado} onValueChange={(value) => setSelectedEstado(value === "todos" ? "" : value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activos</SelectItem>
              <SelectItem value="inactivo">Inactivos</SelectItem>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFechaDesde('');
                    setFechaHasta('');
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
              <TableHead>Nombre Completo</TableHead>
              <TableHead>CI</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Celular</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">
                  {cliente.nombre} {cliente.apellido_paterno} {cliente.apellido_materno || ''}
                </TableCell>
                <TableCell>{cliente.ci}</TableCell>
                <TableCell>{cliente.email || 'No registrado'}</TableCell>
                <TableCell>{cliente.celular || 'No registrado'}</TableCell>
                <TableCell>
                  <Switch
                    checked={cliente.activo}
                    onCheckedChange={(checked) => {
                      router.put(`/clientes/${cliente.id}`, {
                        activo: checked,
                        _method: 'PUT'
                      }, {
                        preserveScroll: true,
                        onSuccess: () => {
                          window.location.reload();
                        }
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={show(cliente).url}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/cliente/tarjetas?cliente_id=${cliente.id}`}>
                        <CreditCard className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/cliente/movimientos?cliente_id=${cliente.id}`}>
                        <History className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={edit(cliente).url}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <RoleGuard roles={['admin']}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (confirm('¿Está seguro de eliminar este cliente?')) {
                            router.delete(destroy(cliente).url);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </RoleGuard>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {data.last_page > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {data.data.length} de {data.total} clientes
          </div>
          <div className="flex space-x-1">
            {data.links && data.links.map((link: any, index: number) => (
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