import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { update as clientesUpdate } from '@/routes/clientes';
import { type Cliente } from '@/types/giftCard';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface EditClienteProps {
    cliente: Cliente;
}

export function EditCliente({ cliente }: EditClienteProps) {
    const [formData, setFormData] = useState({
        nombre: cliente.nombre,
        apellido_paterno: cliente.apellido_paterno,
        apellido_materno: cliente.apellido_materno || '',
        ci: cliente.ci,
        email: cliente.email || '',
        celular: cliente.celular || '',
        direccion: cliente.direccion || '',
        fecha_nacimiento: cliente.fecha_nacimiento || '',
        genero: cliente.genero || '' as '' | 'M' | 'F',
        activo: cliente.activo,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.put(clientesUpdate(cliente).url, formData, {
            onError: (err) => {
                setErrors(err);
                setLoading(false);
            },
            onSuccess: () => {
                // Redirect handled by controller
            },
        });
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Card className="max-w-4xl">
            <CardHeader>
                <CardTitle>Editar Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre *</Label>
                            <Input
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                                placeholder="Ingrese el nombre"
                            />
                            {errors.nombre && (
                                <p className="text-sm text-red-600">{errors.nombre}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="apellido_paterno">Apellido Paterno *</Label>
                            <Input
                                id="apellido_paterno"
                                value={formData.apellido_paterno}
                                onChange={(e) => handleChange('apellido_paterno', e.target.value)}
                                placeholder="Ingrese el apellido paterno"
                            />
                            {errors.apellido_paterno && (
                                <p className="text-sm text-red-600">{errors.apellido_paterno}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="apellido_materno">Apellido Materno</Label>
                            <Input
                                id="apellido_materno"
                                value={formData.apellido_materno}
                                onChange={(e) => handleChange('apellido_materno', e.target.value)}
                                placeholder="Ingrese el apellido materno"
                            />
                            {errors.apellido_materno && (
                                <p className="text-sm text-red-600">{errors.apellido_materno}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ci">Carnet de Identidad *</Label>
                            <Input
                                id="ci"
                                value={formData.ci}
                                onChange={(e) => handleChange('ci', e.target.value)}
                                placeholder="Ingrese el CI"
                            />
                            {errors.ci && (
                                <p className="text-sm text-red-600">{errors.ci}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="correo@ejemplo.com"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="celular">Número de Celular</Label>
                            <Input
                                id="celular"
                                value={formData.celular}
                                onChange={(e) => handleChange('celular', e.target.value)}
                                placeholder="Ingrese el número de celular"
                            />
                            {errors.celular && (
                                <p className="text-sm text-red-600">{errors.celular}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                            <Input
                                id="fecha_nacimiento"
                                type="date"
                                value={formData.fecha_nacimiento}
                                onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                            />
                            {errors.fecha_nacimiento && (
                                <p className="text-sm text-red-600">{errors.fecha_nacimiento}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="genero">Género</Label>
                            <Select value={formData.genero} onValueChange={(value) => handleChange('genero', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione el género" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Masculino</SelectItem>
                                    <SelectItem value="F">Femenino</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.genero && (
                                <p className="text-sm text-red-600">{errors.genero}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                            id="direccion"
                            value={formData.direccion}
                            onChange={(e) => handleChange('direccion', e.target.value)}
                            placeholder="Ingrese la dirección completa"
                        />
                        {errors.direccion && (
                            <p className="text-sm text-red-600">{errors.direccion}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="activo"
                            checked={formData.activo}
                            onCheckedChange={(checked) => handleChange('activo', !!checked)}
                        />
                        <Label htmlFor="activo">Cliente activo</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => router.visit('/clientes')}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}