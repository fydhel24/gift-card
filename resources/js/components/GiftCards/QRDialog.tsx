import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CodeDisplay } from '@/components/ui/code-display';
import { useState, useEffect } from 'react';
import { QrCode, Eye, X } from 'lucide-react';
import QRCode from 'qrcode';

interface QRDialogProps {
    codigoUnico: string;
    trigger?: React.ReactNode;
    variant?: 'button' | 'icon';
}

export function QRDialog({ codigoUnico, trigger, variant = 'button' }: QRDialogProps) {
    const [qrCode, setQrCode] = useState<string>('');
    const [showDialog, setShowDialog] = useState(false);

    // Generar QR cuando se abre el dialog
    useEffect(() => {
        if (showDialog && !qrCode) {
            QRCode.toDataURL(codigoUnico, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }).then(url => {
                setQrCode(url);
            }).catch(err => {
                console.error('Error generando QR:', err);
            });
        }
    }, [showDialog, qrCode, codigoUnico]);

    const defaultTrigger = variant === 'icon' ? (
        <Button variant="ghost" size="sm">
            <QrCode className="h-4 w-4" />
        </Button>
    ) : (
        <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" />
            Ver QR
        </Button>
    );

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                {trigger || defaultTrigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Código QR de la Tarjeta
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDialog(false)}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-sm text-muted-foreground text-center">
                        <div className="font-medium mb-2">Código único:</div>
                        <CodeDisplay code={codigoUnico} size="sm" />
                    </div>
                    {qrCode ? (
                        <div className="flex justify-center">
                            <img
                                src={qrCode}
                                alt={`QR Code para ${codigoUnico}`}
                                className="max-w-full max-h-64 border rounded-lg object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-64 h-64 border rounded-lg flex items-center justify-center">
                            <div className="text-muted-foreground">Generando QR...</div>
                        </div>
                    )}
                    <div className="text-xs text-muted-foreground text-center">
                        Escanea este código para procesar transacciones
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button variant="outline" onClick={() => setShowDialog(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cerrar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}