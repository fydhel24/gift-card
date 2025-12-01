import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { destroy, edit } from '@/routes/users';
import { type User } from '@/types/giftCard';

interface UsersDataTableProps {
    data: {
        data: User[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    onSearch: (search: string) => void;
    initialSearch: string;
}

export function UsersDataTable({ data, onSearch, initialSearch }: UsersDataTableProps) {
    const handleDelete = (user: User) => {
        if (confirm(`¿Estás seguro de eliminar al usuario ${user.name}?`)) {
            router.delete(destroy(user.id).url, {
                onSuccess: () => {
                    // Refresh or handle success
                },
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        value={initialSearch}
                        onChange={(e) => onSearch(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Fecha de Creación</TableHead>
                            <TableHead className="w-[100px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {user.roles?.map((role) => (
                                            <Badge key={role} variant="secondary">
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {new Date(user.created_at).toLocaleDateString('es-ES')}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={edit(user.id).url}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(user)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Mostrando {data.data.length} de {data.meta.total} usuarios
                </div>
                <div className="flex space-x-1">
                    {data.links.map((link, index) => (
                        <Button
                            key={index}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            asChild={!!link.url}
                            disabled={!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url} preserveScroll>
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </Link>
                            ) : (
                                <span>{link.label.replace('&laquo;', '«').replace('&raquo;', '»')}</span>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}