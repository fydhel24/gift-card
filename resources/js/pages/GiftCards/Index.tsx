// resources/js/pages/GiftCards/Index.tsx
import { GiftCard, PaginatedGiftCards } from '@/types/giftCard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { DataTable } from '@/components/GiftCards/DataTable';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default function GiftCardsIndex() {
  const { tarjetas, filters } = usePage<{ 
    tarjetas: PaginatedGiftCards; 
    filters: { search?: string; per_page?: number } 
  }>().props;

  const handleSearch = (value: string) => {
    router.get(route('gift-cards.index'), { ...filters, search: value || undefined }, { preserveState: true });
  };

  return (
    <div className="space-y-6">
      <Head title="Tarjetas Gift Card" />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tarjetas Gift Card</h1>
        <Button asChild>
          <Link href={route('gift-cards.create')}>
            <PlusIcon className="mr-2 h-4 w-4" /> Nueva Tarjeta
          </Link>
        </Button>
      </div>

      <DataTable 
        data={tarjetas} 
        onSearch={handleSearch} 
        initialSearch={filters.search} 
      />
    </div>
  );
}