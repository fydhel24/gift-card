import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import {
    CreditCard,
    DollarSign,
    TrendingUp,
    Users,
    Activity,
    Target
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Index() {
    const page = usePage();
    const {
        stats,
        ingresos_por_dia,
        top_clientes,
        movimientos_por_tipo
    } = page.props as any;

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    const StatCard = ({
        title,
        value,
        icon: Icon,
        trend,
        color = "blue"
    }: {
        title: string;
        value: string | number;
        icon: any;
        trend?: string;
        color?: string;
    }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 text-${color}-600`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <p className="text-xs text-muted-foreground">
                        {trend}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Resumen general del sistema de tarjetas de regalo
                        </p>
                    </div>
                </div>

                {/* Estadísticas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Tarjetas"
                        value={stats.total_tarjetas}
                        icon={CreditCard}
                        color="blue"
                    />
                    <StatCard
                        title="Tarjetas Activas"
                        value={stats.tarjetas_activas}
                        icon={Target}
                        color="green"
                    />
                    <StatCard
                        title="Ingresos Totales"
                        value={formatCurrency(stats.ingresos_totales)}
                        icon={DollarSign}
                        color="green"
                    />
                    <StatCard
                        title="Movimientos (último mes)"
                        value={stats.movimientos_ultimo_mes}
                        icon={Activity}
                        color="purple"
                    />
                </div>

                {/* Gráficos */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Ingresos por día */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ingresos por Día (últimos 30 días)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={ingresos_por_dia}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="fecha"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                    />
                                    <YAxis tickFormatter={formatCurrency} />
                                    <Tooltip
                                        labelFormatter={(value) => new Date(value).toLocaleDateString('es-ES')}
                                        formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        dot={{ fill: '#8884d8' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Movimientos por tipo */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Movimientos por Tipo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={movimientos_por_tipo}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="cantidad"
                                    >
                                        {movimientos_por_tipo.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Clientes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top 10 Clientes por Gasto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={top_clientes} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={formatCurrency} />
                                <YAxis
                                    type="category"
                                    dataKey="nombre"
                                    width={120}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value: number) => [formatCurrency(value), 'Total Gastado']}
                                />
                                <Bar dataKey="total_gastado" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Resumen financiero */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                Ingresos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(stats.ingresos_totales)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total de cargas realizadas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />
                                Egresos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {formatCurrency(stats.egresos_totales)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total de cargos realizados
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className={`h-5 w-5 ${stats.saldo_neto >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                                Saldo Neto
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stats.saldo_neto >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(Math.abs(stats.saldo_neto))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.saldo_neto >= 0 ? 'Superávit' : 'Déficit'}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}