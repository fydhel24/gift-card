// resources/js/components/GiftCards/DataTable.tsx
import { GiftCard, PaginatedGiftCards } from '@/types/giftCard';
import { show, edit, destroy } from '@/routes/gift-cards';
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
import { RoleGuard } from '@/components/RoleGuard';
import { useEffect, useState } from 'react';
import { Edit, Eye, Trash2, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { QRDialog } from './QRDialog';
import { CodeDisplay } from '@/components/ui/code-display';

interface DataTableProps {
  data: PaginatedGiftCards;
  onSearch: (value: string) => void;
  initialSearch?: string;
}

export function DataTable({ data, onSearch, initialSearch = '' }: DataTableProps) {
    const [search, setSearch] = useState(initialSearch);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (tarjetaId: number) => {
      const newExpanded = new Set(expandedRows);
      if (newExpanded.has(tarjetaId)) {
          newExpanded.delete(tarjetaId);
      } else {
          newExpanded.add(tarjetaId);
      }
      setExpandedRows(newExpanded);
  };

  const truncateCode = (code: string, maxLength: number = 15) => {
      if (code.length <= maxLength) return code;
      return code.substring(0, maxLength) + '...';
  };

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
              <TableHead>Detalles</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
         <TableBody>
           {data.data.map((tarjeta) => {
             const isExpanded = expandedRows.has(tarjeta.id);
             const isLongCode = tarjeta.codigo_unico.length > 15;

             return (
               <>
                 <TableRow key={tarjeta.id}>
                   <TableCell className="font-mono">
                     <div className="flex items-center space-x-2">
                       <span>{isExpanded ? tarjeta.codigo_unico : truncateCode(tarjeta.codigo_unico)}</span>
                       {isLongCode && (
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => toggleRowExpansion(tarjeta.id)}
                           className="h-6 w-6 p-0"
                         >
                           {isExpanded ? (
                             <ChevronUp className="h-3 w-3" />
                           ) : (
                             <ChevronDown className="h-3 w-3" />
                           )}
                         </Button>
                       )}
                     </div>
                   </TableCell>
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
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => toggleRowExpansion(tarjeta.id)}
                       className="h-8 w-8 p-0"
                     >
                       {isExpanded ? (
                         <EyeOff className="h-4 w-4" />
                       ) : (
                         <Eye className="h-4 w-4" />
                       )}
                     </Button>
                   </TableCell>
                   <TableCell>
                     <div className="flex space-x-2">
                       <QRDialog
                         codigoUnico={tarjeta.codigo_unico}
                         variant="icon"
                       />
                       <Button asChild size="sm" variant="outline">
                         <Link href={show(tarjeta).url}>
                           <Eye className="h-4 w-4" />
                         </Link>
                       </Button>
                       <Button asChild size="sm" variant="outline">
                         <Link href={edit(tarjeta).url}>
                           <Edit className="h-4 w-4" />
                         </Link>
                       </Button>
                       <RoleGuard roles={['admin']}>
                         <Button
                           size="sm"
                           variant="outline"
                           onClick={() => {
                             if (confirm('¿Estás seguro de eliminar esta tarjeta?')) {
                               router.delete(destroy(tarjeta).url);
                             }
                           }}
                         >
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       </RoleGuard>
                     </div>
                   </TableCell>
                 </TableRow>
                 {isExpanded && (
                   <TableRow key={`${tarjeta.id}-expanded`}>
                     <TableCell colSpan={6} className="bg-muted/50">
                       <div className="p-4 space-y-3">
                         <div className="flex items-center justify-between">
                           <h4 className="font-medium text-sm">Información completa de la tarjeta</h4>
                           <CodeDisplay code={tarjeta.codigo_unico} size="sm" className="max-w-xs" />
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                           <div>
                             <span className="font-medium">Tipo:</span> {tarjeta.tipo || 'N/A'}
                           </div>
                           <div>
                             <span className="font-medium">Saldo Inicial:</span> ${tarjeta.saldo_inicial}
                           </div>
                           <div>
                             <span className="font-medium">Fecha Expiración:</span> {tarjeta.fecha_expiracion || 'Sin expiración'}
                           </div>
                           <div>
                             <span className="font-medium">Creado:</span> {new Date(tarjeta.created_at).toLocaleDateString()}
                           </div>
                         </div>
                         {tarjeta.cliente && (
                           <div className="text-sm p-2 bg-background rounded border">
                             <span className="font-medium">Cliente asociado:</span> {tarjeta.cliente.nombre} {tarjeta.cliente.apellido_paterno} - {tarjeta.cliente.email}
                           </div>
                         )}
                       </div>
                     </TableCell>
                   </TableRow>
                 )}
               </>
             );
           })}
         </TableBody>
      </Table>
    </div>
  );
}