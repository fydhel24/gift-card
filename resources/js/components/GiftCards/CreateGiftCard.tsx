import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { store as giftCardsStore } from '@/routes/gift-cards';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export function CreateGiftCard() {
    const [formData, setFormData] = useState({
        codigo_unico: '',
        saldo_inicial: '',
        tipo: '',
        fecha_expiracion: '',
        estado: 'activa' as 'activa' | 'inactiva',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post(giftCardsStore().url, formData, {
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
                <CardTitle>Crear Nueva Tarjeta</CardTitle>
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
                            <Label htmlFor="saldo_inicial">Saldo Inicial</Label>
                            <Input
                                id="saldo_inicial"
                                type="number"
                                step="0.01"
                                value={formData.saldo_inicial}
                                onChange={(e) => handleChange('saldo_inicial', e.target.value)}
                                placeholder="0.00"
                            />
                            {errors.saldo_inicial && (
                                <p className="text-sm text-red-600">{errors.saldo_inicial}</p>
                            )}
                        </div>
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
                            {loading ? 'Creando...' : 'Crear Tarjeta'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}