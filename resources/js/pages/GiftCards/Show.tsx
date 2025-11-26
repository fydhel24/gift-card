// resources/js/pages/GiftCards/Show.tsx
import { GiftCard, Cliente } from '@/types/giftCard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientSelector } from '@/components/GiftCards/ClientSelector';

export default function GiftCardShow() {
  const { tarjeta, clientesDisponibles } = usePage<{ 
    tarjeta: GiftCard; 
    clientesDisponibles: Cliente[] 
  }>().props;

  const handleAssociate = (clienteId: number) => {
    router.post(route('gift-cards.associate-client', tarjeta.id), { cliente_id: clienteId });
  };

  const handleDissociate = () => {
    if (confirm('¿Desasociar cliente?')) {
      router.post(route('gift-cards.dissociate-client', tarjeta.id));
    }
  };

  return (
    <div className="space-y-6">
      <Head title={`Tarjeta ${tarjeta.codigo_unico}`} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tarjeta: {tarjeta.codigo_unico}</h1>
        <Button asChild variant="outline">
          <Link href={route('gift-cards.index')}>Volver</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Saldo:</strong> ${tarjeta.saldo_actual}</p>
          <p><strong>Estado:</strong> {tarjeta.estado}</p>
          {tarjeta.cliente ? (
            <div>
              <p><strong>Cliente:</strong> {tarjeta.cliente.nombre} {tarjeta.cliente.apellido_paterno}</p>
              <Button size="sm" variant="destructive" onClick={handleDissociate}>
                Desasociar
              </Button>
            </div>
          ) : (
            <ClientSelector 
              clientes={clientesDisponibles} 
              onAssociate={handleAssociate} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}