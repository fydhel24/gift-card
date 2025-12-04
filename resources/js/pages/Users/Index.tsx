import { Button } from '@/components/ui/button';
import { UsersDataTable } from '@/components/Users/UsersDataTable';
import AppLayout from '@/layouts/app-layout';
import { create as usersCreate, index as usersIndex } from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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
                    <Button asChild>
                        <Link href={usersCreate().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Usuario
                        </Link>
                    </Button>
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
