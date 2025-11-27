import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Asignar Tarjetas',
        href: '/encargado/asignar-tarjetas',
    },
];

export default function AsignarTarjetas() {
    const page = usePage();
    const { tarjetas, clientes } = page.props as any;

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTarjeta, setSelectedTarjeta] = useState<any>(null);
    const [mode, setMode] = useState<'search' | 'create'>('search');
    const [searchCi, setSearchCi] = useState('');
    const [clienteData, setClienteData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (mode === 'create' && !clienteData) {
            setClienteData({
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                ci: '',
                email: '',
                celular: '',
                direccion: '',
                fecha_nacimiento: '',
                genero: '',
            });
        }
    }, [mode, clienteData]);

    useEffect(() => {
        const errors = page.props.errors;
        if (errors) {
            Object.values(errors).forEach((error: any) => {
                toast.error(error);
            });
        }
    }, [page.props.errors]);

    const handleSearchCliente = () => {
        const cliente = clientes.find((c: any) => c.ci === searchCi);
        if (cliente) {
            setClienteData(cliente);
            setIsEditing(true);
        } else {
            setClienteData({
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                ci: searchCi,
                email: '',
                celular: '',
                direccion: '',
                fecha_nacimiento: '',
                genero: '',
            });
            setIsEditing(false);
        }
    };

    const openAssignDialog = (tarjeta: any) => {
        setSelectedTarjeta(tarjeta);
        setMode('search');
        setSearchCi('');
        setClienteData(null);
        setIsEditing(false);
        setDialogOpen(true);
    };

    const handleAssign = (clienteId: string) => {
        if (!clienteId || !selectedTarjeta) return;

        router.post(`/encargado/asignar-tarjeta/${selectedTarjeta.id}`, {
            cliente_id: clienteId,
        }, {
            onSuccess: () => {
                toast.success('Tarjeta asignada exitosamente');
                setDialogOpen(false);
                setSelectedTarjeta(null);
                setClienteData(null);
                setSearchCi('');
            }
        });
    };

    const handleCreateOrUpdate = () => {
        if (isEditing) {
            // Update existing
            router.put(`/clientes/${clienteData.id}`, clienteData, {
                onSuccess: () => {
                    toast.success('Cliente actualizado exitosamente');
                    handleAssign(clienteData.id);
                }
            });
        } else {
            // Create new
            router.post('/clientes', clienteData, {
                onSuccess: (page) => {
                    toast.success('Cliente creado exitosamente');
                    // Assume the response has the created cliente
                    const newCliente = page.props?.cliente || clienteData;
                    if (newCliente.id) {
                        handleAssign(newCliente.id);
                    }
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Asignar Tarjetas" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Asignar Tarjetas a Clientes</h1>
                        <p className="text-muted-foreground">
                            Gestiona la asignación de tarjetas de regalo a clientes
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Tarjetas Disponibles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Código</TableHead>
                                        <TableHead>Saldo Inicial</TableHead>
                                        <TableHead>Saldo Actual</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Asignar a Cliente</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(tarjetas?.data || []).map((tarjeta: any) => (
                                        <TableRow key={tarjeta.id}>
                                            <TableCell className="font-medium">{tarjeta.codigo_unico}</TableCell>
                                            <TableCell>{formatCurrency(parseFloat(tarjeta.saldo_inicial))}</TableCell>
                                            <TableCell>{formatCurrency(parseFloat(tarjeta.saldo_actual))}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-xs ${tarjeta.estado === 'activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {tarjeta.estado}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => openAssignDialog(tarjeta)}>
                                                    Asignar Cliente
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>

                    {/* Paginación */}
                    {tarjetas && (
                        <div className="flex items-center justify-between mt-4 px-6">
                            <div className="text-sm text-gray-700">
                                Mostrando {(tarjetas.data || []).length} de {tarjetas.meta?.total || 0} tarjetas
                            </div>
                            <div className="flex space-x-1">
                                {(tarjetas.links || []).map((link: any, index: number) => (
                                    <button
                                        key={index}
                                        className={`px-3 py-1 text-sm border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        disabled={!link.url}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Card>

                {/* Dialog para asignar cliente */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Asignar Cliente a Tarjeta {selectedTarjeta?.codigo_unico}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Button variant={mode === 'search' ? 'default' : 'outline'} onClick={() => setMode('search')}>
                                    Buscar Cliente Existente
                                </Button>
                                <Button variant={mode === 'create' ? 'default' : 'outline'} onClick={() => setMode('create')}>
                                    Crear Nuevo Cliente
                                </Button>
                            </div>

                            {mode === 'search' && (
                                <div>
                                    <Label htmlFor="searchCi">Buscar por CI</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="searchCi"
                                            value={searchCi}
                                            onChange={(e) => setSearchCi(e.target.value)}
                                            placeholder="Ingrese CI del cliente"
                                        />
                                        <Button onClick={handleSearchCliente}>Buscar</Button>
                                    </div>
                                </div>
                            )}

                            {mode === 'create' && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Complete los datos del nuevo cliente</p>
                                </div>
                            )}

                            {clienteData && (
                                <div className="space-y-4">
                                    <h3 className="font-medium">{isEditing ? 'Cliente encontrado - Editar si es necesario' : 'Nuevo cliente - Complete los datos'}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nombre">Nombre</Label>
                                            <Input
                                                id="nombre"
                                                value={clienteData.nombre}
                                                onChange={(e) => setClienteData({...clienteData, nombre: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="apellido_paterno">Apellido Paterno</Label>
                                            <Input
                                                id="apellido_paterno"
                                                value={clienteData.apellido_paterno}
                                                onChange={(e) => setClienteData({...clienteData, apellido_paterno: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="apellido_materno">Apellido Materno</Label>
                                            <Input
                                                id="apellido_materno"
                                                value={clienteData.apellido_materno || ''}
                                                onChange={(e) => setClienteData({...clienteData, apellido_materno: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="ci">CI</Label>
                                            <Input
                                                id="ci"
                                                value={clienteData.ci}
                                                onChange={(e) => setClienteData({...clienteData, ci: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                value={clienteData.email || ''}
                                                onChange={(e) => setClienteData({...clienteData, email: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="celular">Celular</Label>
                                            <Input
                                                id="celular"
                                                value={clienteData.celular || ''}
                                                onChange={(e) => setClienteData({...clienteData, celular: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={handleCreateOrUpdate}>
                                            {isEditing ? 'Actualizar y Asignar' : 'Crear y Asignar'}
                                        </Button>
                                        {isEditing && (
                                            <Button variant="outline" onClick={() => handleAssign(clienteData.id)}>
                                                Asignar sin cambios
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}