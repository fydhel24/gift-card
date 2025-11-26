// resources/js/components/GiftCards/DataTable.tsx
import { GiftCard, PaginatedGiftCards } from '@/types/giftCard';
import { Link } from '@inertiajs/react';
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
import { useEffect, useState } from 'react';

interface DataTableProps {
  data: PaginatedGiftCards;
  onSearch: (value: string) => void;
  initialSearch?: string;
}

export function DataTable({ data, onSearch, initialSearch = '' }: DataTableProps) {
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar por código o cliente..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((tarjeta) => (
            <TableRow key={tarjeta.id}>
              <TableCell className="font-mono">{tarjeta.codigo_unico}</TableCell>
              <TableCell>${tarjeta.saldo_actual}</TableCell>
              <TableCell>
                {tarjeta.cliente 
                  ? `${tarjeta.cliente.nombre} ${tarjeta.cliente.apellido_paterno}` 
                  : <span className="text-muted-foreground">Sin cliente</span>}
              </TableCell>
              <TableCell>
                <span className={tarjeta.estado === 'activa' ? 'text-green-600' : 'text-red-600'}>
                  {tarjeta.estado}
                </span>
              </TableCell>
              <TableCell>
                <Button asChild size="sm" variant="outline">
                  <Link href={route('gift-cards.show', tarjeta.id)}>Ver</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}