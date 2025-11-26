import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { process } from '@/routes/transactions';
import { type GiftCard } from '@/types/giftCard';
import { router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Search, CreditCard, DollarSign, Camera, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export function TransactionForm() {
    const [codigo, setCodigo] = useState('');
    const [tarjeta, setTarjeta] = useState<GiftCard | null>(null);
    const [tipo, setTipo] = useState<'carga' | 'cargo'>('carga');
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showQrScanner, setShowQrScanner] = useState(false);
    const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);

    const buscarTarjeta = async (codigoABuscar?: string) => {
        const codigoToSearch = codigoABuscar || codigo;
        if (!codigoToSearch.trim()) return;

        setSearchLoading(true);
        try {
            const response = await fetch(`/api/gift-cards/by-codigo/${codigoToSearch}`);
            if (response.ok) {
                const data = await response.json();
                setTarjeta(data);
                setCodigo(codigoToSearch);
                setErrors({});
                setShowQrScanner(false); // Cerrar scanner si estaba abierto
            } else {
                setTarjeta(null);
                setErrors({ codigo: 'Tarjeta no encontrada' });
            }
        } catch (error) {
            setTarjeta(null);
            setErrors({ codigo: 'Error al buscar la tarjeta' });
        }
        setSearchLoading(false);
    };

    const iniciarQrScanner = () => {
        setShowQrScanner(true);
    };

    const detenerQrScanner = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.clear().catch(console.error);
            qrScannerRef.current = null;
        }
        setShowQrScanner(false);
    };

    useEffect(() => {
        if (showQrScanner) {
            qrScannerRef.current = new Html5QrcodeScanner(
                'qr-reader',
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                },
                false
            );

            qrScannerRef.current.render(
                (decodedText) => {
                    buscarTarjeta(decodedText);
                },
                (error) => {
                    console.log('QR scan error:', error);
                }
            );
        }

        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.clear().catch(console.error);
            }
        };
    }, [showQrScanner]);

    const procesarTransaccion = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tarjeta) return;

        setLoading(true);
        setErrors({});

        router.post(process().url, {
            codigo_unico: tarjeta.codigo_unico,
            tipo,
            monto: parseFloat(monto),
            descripcion: descripcion.trim() || null,
        }, {
            onError: (err) => {
                setErrors(err);
                setLoading(false);
            },
            onSuccess: () => {
                // Reset form
                setMonto('');
                setDescripcion('');
                setLoading(false);
                // Optionally refresh card data
                buscarTarjeta();
            },
        });
    };

    return (
        <div className="space-y-6">
            {/* Búsqueda de tarjeta */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Buscar Tarjeta
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label htmlFor="codigo">Código de la Tarjeta</Label>
                            <Input
                                id="codigo"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Ingrese el código único"
                                onKeyPress={(e) => e.key === 'Enter' && buscarTarjeta()}
                            />
                            {errors.codigo && (
                                <p className="text-sm text-red-600 mt-1">{errors.codigo}</p>
                            )}
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={() => buscarTarjeta()} disabled={searchLoading}>
                                {searchLoading ? 'Buscando...' : 'Buscar'}
                            </Button>
                            <Dialog open={showQrScanner} onOpenChange={setShowQrScanner}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={iniciarQrScanner}>
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Escanear Código QR</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div id="qr-reader" className="w-full"></div>
                                        <Button variant="outline" onClick={detenerQrScanner}>
                                            <X className="h-4 w-4 mr-2" />
                                            Cerrar
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Información de la tarjeta encontrada */}
            {tarjeta && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Información de la Tarjeta
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <Label>Código</Label>
                                <p className="font-mono text-lg">{tarjeta.codigo_unico}</p>
                            </div>
                            <div>
                                <Label>Saldo Actual</Label>
                                <p className="text-lg font-semibold text-green-600">${tarjeta.saldo_actual}</p>
                            </div>
                            <div>
                                <Label>Estado</Label>
                                <p className={tarjeta.estado === 'activa' ? 'text-green-600' : 'text-red-600'}>
                                    {tarjeta.estado}
                                </p>
                            </div>
                            <div>
                                <Label>Cliente</Label>
                                <p>{tarjeta.cliente ? `${tarjeta.cliente.nombre} ${tarjeta.cliente.apellido_paterno}` : 'Sin cliente'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Formulario de transacción */}
            {tarjeta && tarjeta.estado === 'activa' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Procesar Transacción
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={procesarTransaccion} className="space-y-4">
                            <div>
                                <Label>Tipo de Transacción</Label>
                                <Select value={tipo} onValueChange={(value) => setTipo(value as 'carga' | 'cargo')}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="carga">Carga (Agregar saldo)</SelectItem>
                                        <SelectItem value="cargo">Cargo (Restar saldo)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="monto">Monto *</Label>
                                    <Input
                                        id="monto"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={monto}
                                        onChange={(e) => setMonto(e.target.value)}
                                        placeholder="0.00"
                                    />
                                    {errors.monto && (
                                        <p className="text-sm text-red-600 mt-1">{errors.monto}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="descripcion">Descripción (Opcional)</Label>
                                    <Input
                                        id="descripcion"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        placeholder="Motivo de la transacción"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={loading || !monto}>
                                    {loading ? 'Procesando...' : `Realizar ${tipo === 'carga' ? 'Carga' : 'Cargo'}`}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {tarjeta && tarjeta.estado !== 'activa' && (
                <Card className="border-red-200">
                    <CardContent className="pt-6">
                        <p className="text-red-600">Esta tarjeta no está activa y no puede procesar transacciones.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}