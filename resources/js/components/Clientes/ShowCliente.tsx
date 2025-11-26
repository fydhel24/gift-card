import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { edit as clientesEdit } from '@/routes/clientes';
import { type Cliente } from '@/types/giftCard';
import { Link } from '@inertiajs/react';
import { Edit, User } from 'lucide-react';

interface ShowClienteProps {
    cliente: Cliente & { tarjetasGift?: any[] };
}

export function ShowCliente({ cliente }: ShowClienteProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Nombre Completo</label>
                            <p className="text-lg">{cliente.nombre} {cliente.apellido_paterno} {cliente.apellido_materno || ''}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Carnet de Identidad</label>
                            <p className="text-lg font-mono">{cliente.ci}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Correo Electrónico</label>
                            <p>{cliente.email || 'No registrado'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Número de Celular</label>
                            <p>{cliente.celular || 'No registrado'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Fecha de Nacimiento</label>
                            <p>{cliente.fecha_nacimiento ? new Date(cliente.fecha_nacimiento).toLocaleDateString() : 'No registrada'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Género</label>
                            <p>{cliente.genero === 'M' ? 'Masculino' : cliente.genero === 'F' ? 'Femenino' : 'No especificado'}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Dirección</label>
                        <p>{cliente.direccion || 'No registrada'}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Estado</label>
                        <div className="mt-1">
                            <Badge variant={cliente.activo ? 'default' : 'secondary'}>
                                {cliente.activo ? 'Activo' : 'Inactivo'}
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Fecha de Registro</label>
                        <p>{new Date(cliente.created_at).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>

            {cliente.tarjetasGift && cliente.tarjetasGift.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Tarjetas de Regalo Asociadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {cliente.tarjetasGift.map((tarjeta: any) => (
                                <div key={tarjeta.id} className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                        <p className="font-medium">Código: {tarjeta.codigo_unico}</p>
                                        <p className="text-sm text-muted-foreground">Saldo: ${tarjeta.saldo_actual}</p>
                                    </div>
                                    <Badge variant={tarjeta.estado === 'activa' ? 'default' : 'secondary'}>
                                        {tarjeta.estado}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-end">
                <Button asChild>
                    <Link href={clientesEdit(cliente).url}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Cliente
                    </Link>
                </Button>
            </div>
        </div>
    );
}