import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { update as giftCardsUpdate } from '@/routes/gift-cards';
import { type GiftCard } from '@/types/giftCard';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface EditGiftCardProps {
    tarjeta: GiftCard;
    clientes: Array<{ id: number; nombre: string; apellido_paterno: string }>;
}

export function EditGiftCard({ tarjeta, clientes }: EditGiftCardProps) {
    const [formData, setFormData] = useState({
        codigo_unico: tarjeta.codigo_unico,
        saldo_actual: tarjeta.saldo_actual,
        cliente_id: tarjeta.cliente?.id?.toString() || '',
        tipo: tarjeta.tipo || '',
        estado: tarjeta.estado,
        fecha_expiracion: tarjeta.fecha_expiracion || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const dataToSend = {
            ...formData,
            cliente_id: formData.cliente_id === '' ? null : formData.cliente_id,
        };

        router.put(giftCardsUpdate(tarjeta).url, dataToSend, {
            onError: (err) => {
                setErrors(err);
                setLoading(false);
            },
            onSuccess: () => {
                // Redirect handled by controller
            },
        });
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Editar Tarjeta</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="codigo_unico">Código Único</Label>
                            <Input
                                id="codigo_unico"
                                value={formData.codigo_unico}
                                onChange={(e) => handleChange('codigo_unico', e.target.value)}
                                placeholder="Ingrese código único"
                            />
                            {errors.codigo_unico && (
                                <p className="text-sm text-red-600">{errors.codigo_unico}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="saldo_actual">Saldo Actual</Label>
                            <Input
                                id="saldo_actual"
                                type="number"
                                step="0.01"
                                value={formData.saldo_actual}
                                onChange={(e) => handleChange('saldo_actual', e.target.value)}
                                placeholder="0.00"
                            />
                            {errors.saldo_actual && (
                                <p className="text-sm text-red-600">{errors.saldo_actual}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cliente_id">Cliente (Opcional)</Label>
                        <Select value={formData.cliente_id} onValueChange={(value) => handleChange('cliente_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione un cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                {clientes.map((cliente) => (
                                    <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                        {cliente.nombre} {cliente.apellido_paterno}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.cliente_id && (
                            <p className="text-sm text-red-600">{errors.cliente_id}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo (Opcional)</Label>
                            <Input
                                id="tipo"
                                value={formData.tipo}
                                onChange={(e) => handleChange('tipo', e.target.value)}
                                placeholder="Tipo de tarjeta"
                            />
                            {errors.tipo && (
                                <p className="text-sm text-red-600">{errors.tipo}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fecha_expiracion">Fecha de Expiración (Opcional)</Label>
                            <Input
                                id="fecha_expiracion"
                                type="date"
                                value={formData.fecha_expiracion}
                                onChange={(e) => handleChange('fecha_expiracion', e.target.value)}
                            />
                            {errors.fecha_expiracion && (
                                <p className="text-sm text-red-600">{errors.fecha_expiracion}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select value={formData.estado} onValueChange={(value) => handleChange('estado', value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activa">Activa</SelectItem>
                                <SelectItem value="inactiva">Inactiva</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && (
                            <p className="text-sm text-red-600">{errors.estado}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => router.visit('/gift-cards')}>
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