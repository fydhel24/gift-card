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
import { RoleGuard } from '@/components/RoleGuard';
import { useEffect, useState } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface DataTableProps {
  data: PaginatedClientes;
  onSearch: (value: string) => void;
  initialSearch?: string;
}

export function ClientesDataTable({ data, onSearch, initialSearch = '' }: DataTableProps) {
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar por nombre, apellido, CI o email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-sm"
      />
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
                <Badge variant={cliente.activo ? 'default' : 'secondary'}>
                  {cliente.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={show(cliente).url}>
                      <Eye className="h-4 w-4" />
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
  );
}