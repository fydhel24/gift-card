import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface RoleGuardProps {
    children: ReactNode;
    roles?: string[];
    permissions?: string[];
    requireAll?: boolean; // Si true, requiere todos los roles/permisos; si false, requiere al menos uno
}

export function RoleGuard({
    children,
    roles = [],
    permissions = [],
    requireAll = false
}: RoleGuardProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    if (!user) {
        return null;
    }

    // Verificar roles
    const hasRoles = roles.length === 0 || roles.some(role => user.roles?.includes(role));
    const hasAllRoles = roles.length === 0 || roles.every(role => user.roles?.includes(role));

    // Verificar permisos
    const hasPermissions = permissions.length === 0 || permissions.some(permission => user.permissions?.includes(permission));
    const hasAllPermissions = permissions.length === 0 || permissions.every(permission => user.permissions?.includes(permission));

    // Lógica de evaluación
    if (requireAll) {
        // Requiere todos los roles Y todos los permisos
        const rolesOk = roles.length === 0 ? true : hasAllRoles;
        const permissionsOk = permissions.length === 0 ? true : hasAllPermissions;
        return (rolesOk && permissionsOk) ? <>{children}</> : null;
    } else {
        // Requiere roles Y permisos si especificados
        const rolesOk = roles.length === 0 ? true : hasRoles;
        const permissionsOk = permissions.length === 0 ? true : hasPermissions;
        return (rolesOk && permissionsOk) ? <>{children}</> : null;
    }
}

// Componentes específicos para roles comunes
export function AdminOnly({ children }: { children: ReactNode }) {
    return <RoleGuard roles={['admin']}>{children}</RoleGuard>;
}

export function EncargadoOnly({ children }: { children: ReactNode }) {
    return <RoleGuard roles={['encargado']}>{children}</RoleGuard>;
}

export function ClienteOnly({ children }: { children: ReactNode }) {
    return <RoleGuard roles={['cliente']}>{children}</RoleGuard>;
}

export function StaffOnly({ children }: { children: ReactNode }) {
    return <RoleGuard roles={['admin', 'encargado']}>{children}</RoleGuard>;
}

// Componentes para permisos específicos
export function CanCreateGiftCards({ children }: { children: ReactNode }) {
    return <RoleGuard permissions={['crear tarjetas']}>{children}</RoleGuard>;
}

export function CanEditGiftCards({ children }: { children: ReactNode }) {
    return <RoleGuard permissions={['editar tarjetas']}>{children}</RoleGuard>;
}

export function CanDeleteGiftCards({ children }: { children: ReactNode }) {
    return <RoleGuard permissions={['eliminar tarjetas']}>{children}</RoleGuard>;
}

export function CanManageUsers({ children }: { children: ReactNode }) {
    return <RoleGuard permissions={['gestionar usuarios']}>{children}</RoleGuard>;
}