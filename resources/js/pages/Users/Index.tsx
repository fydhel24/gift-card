import { UsersDataTable } from '@/components/Users/UsersDataTable';
import AppLayout from '@/layouts/app-layout';
import { index as usersIndex } from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: usersIndex().url,
    },
];

export default function Index() {
    const page = usePage();
    const { users, filters } = page.props as any;

    const handleSearch = (search: string) => {
        // Implement search functionality
        window.location.href = `${usersIndex().url}?search=${encodeURIComponent(search)}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Usuarios</h1>
                        <p className="text-muted-foreground">
                            Gestiona los usuarios del sistema.
                        </p>
                    </div>
                </div>

                <UsersDataTable
                    data={users}
                    onSearch={handleSearch}
                    initialSearch={filters.search || ''}
                />
            </div>
        </AppLayout>
    );
}