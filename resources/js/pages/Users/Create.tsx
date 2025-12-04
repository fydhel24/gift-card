import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { store, index as usersIndex } from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { type Role } from '@/types/giftCard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: usersIndex().url,
    },
    {
        title: 'Crear Usuario',
        href: '#',
    },
];

export default function Create() {
    const page = usePage();
    const { roles } = page.props as any;

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        roles: string[];
    }>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post(store().url, formData, {
            onError: (err) => setErrors(err),
            onSuccess: () => router.visit(usersIndex().url),
        });
    };

    const handleRoleChange = (roleName: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            roles: checked
                ? [...prev.roles, roleName]
                : prev.roles.filter((r) => r !== roleName),
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={usersIndex().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crear Usuario</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                password: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">
                                        Confirmar Contraseña
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={formData.password_confirmation}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                password_confirmation:
                                                    e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <Label>Roles</Label>
                                    <div className="space-y-2">
                                        {roles.map((role: Role) => (
                                            <div
                                                key={role.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`role-${role.id}`}
                                                    checked={formData.roles.includes(
                                                        role.name,
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        handleRoleChange(
                                                            role.name,
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`role-${role.id}`}
                                                >
                                                    {role.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.roles && (
                                        <p className="text-sm text-red-600">
                                            {errors.roles}
                                        </p>
                                    )}
                                </div>

                                <Button type="submit">Crear Usuario</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
