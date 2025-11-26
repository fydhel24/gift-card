import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeDisplay } from '@/components/ui/code-display';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { edit, associateClient, dissociateClient } from '@/routes/gift-cards';
import { type GiftCard } from '@/types/giftCard';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Edit, UserMinus, UserPlus } from 'lucide-react';
import { QRDialog } from './QRDialog';

interface ShowGiftCardProps {
    tarjeta: GiftCard & { movimientos?: any[] };
    clientesDisponibles: Array<{ id: number; nombre: string; apellido_paterno: string }>;
}

export function ShowGiftCard({ tarjeta, clientesDisponibles }: ShowGiftCardProps) {
    const [selectedCliente, setSelectedCliente] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAssociate = () => {
        if (!selectedCliente) return;
        setLoading(true);
        router.post(associateClient(tarjeta).url, { cliente_id: selectedCliente }, {
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        });
    };

    const handleDissociate = () => {
        setLoading(true);
        router.post(dissociateClient(tarjeta).url, {}, {
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Información de la Tarjeta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Código Único</Label>
                            <CodeDisplay code={tarjeta.codigo_unico} />
                        </div>
                        <div>
                            <Label>Saldo Actual</Label>
                            <p>${tarjeta.saldo_actual}</p>
                        </div>
                        <div>
                            <Label>Saldo Inicial</Label>
                            <p>${tarjeta.saldo_inicial}</p>
                        </div>
                        <div>
                            <Label>Estado</Label>
                            <p className={tarjeta.estado === 'activa' ? 'text-green-600' : 'text-red-600'}>
                                {tarjeta.estado}
                            </p>
                        </div>
                        <div>
                            <Label>Tipo</Label>
                            <p>{tarjeta.tipo || 'N/A'}</p>
                        </div>
                        <div>
                            <Label>Fecha de Expiración</Label>
                            <p>{tarjeta.fecha_expiracion || 'N/A'}</p>
                        </div>
                    </div>
                    <div>
                        <Label>Creado por</Label>
                        <p>{tarjeta.user?.name}</p>
                    </div>
                    <div>
                        <Label>Fecha de Creación</Label>
                        <p>{new Date(tarjeta.created_at).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Cliente Asociado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {tarjeta.cliente ? (
                        <div className="space-y-2">
                            <p><strong>Nombre:</strong> {tarjeta.cliente.nombre} {tarjeta.cliente.apellido_paterno}</p>
                            <p><strong>Email:</strong> {tarjeta.cliente.email}</p>
                            <Button
                                variant="outline"
                                onClick={handleDissociate}
                                disabled={loading}
                            >
                                <UserMinus className="mr-2 h-4 w-4" />
                                Desasociar Cliente
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p>No hay cliente asociado.</p>
                            <div className="flex space-x-2">
                                <Select value={selectedCliente} onValueChange={setSelectedCliente}>
                                    <SelectTrigger className="w-64">
                                        <SelectValue placeholder="Seleccionar cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientesDisponibles.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                                {cliente.nombre} {cliente.apellido_paterno}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    onClick={handleAssociate}
                                    disabled={!selectedCliente || loading}
                                >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Asociar Cliente
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {tarjeta.movimientos && tarjeta.movimientos.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Movimientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {tarjeta.movimientos.map((movimiento: any) => (
                                <div key={movimiento.id} className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                        <p className="font-medium">{movimiento.tipo_movimiento}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Monto: ${movimiento.monto} | Saldo anterior: ${movimiento.saldo_anterior} | Saldo nuevo: ${movimiento.saldo_nuevo}
                                        </p>
                                        {movimiento.descripcion && (
                                            <p className="text-sm">{movimiento.descripcion}</p>
                                        )}
                                    </div>
                                    <div className="text-right text-sm text-muted-foreground">
                                        <p>{new Date(movimiento.created_at).toLocaleDateString()}</p>
                                        <p>Por: {movimiento.user?.name || 'Sistema'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-end space-x-2">
                <QRDialog codigoUnico={tarjeta.codigo_unico} />

                <Button asChild>
                    <Link href={edit(tarjeta).url}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Tarjeta
                    </Link>
                </Button>
            </div>
        </div>
    );
}