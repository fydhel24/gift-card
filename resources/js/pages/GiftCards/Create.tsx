import { CreateGiftCard } from '@/components/GiftCards/CreateGiftCard';
import AppLayout from '@/layouts/app-layout';
import { index as giftCardsIndex } from '@/routes/gift-cards';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tarjetas de Regalo',
        href: giftCardsIndex().url,
    },
    {
        title: 'Crear Tarjeta',
        href: '#',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Tarjeta de Regalo" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Crear Tarjeta de Regalo</h1>
                        <p className="text-muted-foreground">
                            Crea una nueva tarjeta de regalo.
                        </p>
                    </div>
                </div>

                <CreateGiftCard />
            </div>
        </AppLayout>
    );
}