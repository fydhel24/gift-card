import { EditGiftCard } from '@/components/GiftCards/EditGiftCard';
import AppLayout from '@/layouts/app-layout';
import { index as giftCardsIndex } from '@/routes/gift-cards';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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
        title: 'Editar Tarjeta',
        href: '#',
    },
];

export default function Edit() {
    const { tarjeta, clientes } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Tarjeta de Regalo" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Editar Tarjeta de Regalo</h1>
                        <p className="text-muted-foreground">
                            Modifica los datos de la tarjeta de regalo.
                        </p>
                    </div>
                </div>

                <EditGiftCard tarjeta={tarjeta} clientes={clientes} />
            </div>
        </AppLayout>
    );
}