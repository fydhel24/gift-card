// resources/js/components/GiftCards/ClientSelector.tsx
import { Cliente } from '@/types/giftCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClientSelectorProps {
  clientes: Cliente[];
  onAssociate: (id: number) => void;
}

export function ClientSelector({ clientes, onAssociate }: ClientSelectorProps) {
  let selectedId: number | null = null;

  const handleSelect = (value: string) => {
    selectedId = parseInt(value);
  };

  const handleSubmit = () => {
    if (selectedId) onAssociate(selectedId);
  };

  return (
    <div className="space-y-2">
      <Label>Asociar cliente</Label>
      <div className="flex gap-2">
        <Select onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un cliente" />
          </SelectTrigger>
          <SelectContent>
            {clientes.map(cliente => (
              <SelectItem key={cliente.id} value={cliente.id.toString()}>
                {cliente.nombre} {cliente.apellido_paterno}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit} disabled={!selectedId}>Asociar</Button>
      </div>
    </div>
  );
}