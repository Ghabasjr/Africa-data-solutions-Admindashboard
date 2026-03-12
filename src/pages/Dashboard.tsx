import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import {
    Users, ArrowRightLeft, DollarSign, TrendingUp,
    TrendingDown, Wifi, Tv, Zap, Droplets, Phone,
    RefreshCw, ArrowUpRight,
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';
import { Link } from 'react-router-dom';

const revenueData = [
    { name: 'Jan', revenue: 3200000, transactions: 1420 },
    { name: 'Feb', revenue: 4100000, transactions: 1850 },
    { name: 'Mar', revenue: 3750000, transactions: 1600 },
    { name: 'Apr', revenue: 5200000, transactions: 2300 },
    { name: 'May', revenue: 4800000, transactions: 2100 },
    { name: 'Jun', revenue: 6100000, transactions: 2700 },
    { name: 'Jul', revenue: 7400000, transactions: 3200 },
];

const serviceData = [
    { name: 'Data', value: 42, color: '#007AFF' },
    { name: 'Airtime', value: 28, color: '#FF9500' },
    { name: 'Cable TV', value: 14, color: '#AF52DE' },
    { name: 'Electricity', value: 11, color: '#34C759' },
    { name: 'Water', value: 5, color: '#5AC8FA' },
];

const RECENT_TRANSACTIONS = [
    { id: 'T-8821', user: 'Emeka Obi', type: 'Data Bundle', amount: '₦5,000', status: 'success', time: '2m ago' },
    { id: 'T-8820', user: 'Amara Kalu', type: 'Airtime', amount: '₦2,500', status: 'success', time: '15m ago' },
    { id: 'T-8819', user: 'Chidi Nwosu', type: 'Cable TV', amount: '₦9,700', status: 'success', time: '38m ago' },
    { id: 'T-8818', user: 'Fatima Bello', type: 'Electricity', amount: '₦15,000', status: 'error', time: '1h ago' },
    { id: 'T-8817', user: 'Seun Adebayo', type: 'Data Bundle', amount: '₦3,200', status: 'warning', time: '2h ago' },
];

const STATS = [
    {
        label: 'Total Users',
        value: '24,318',
        change: '+12.4%',
        up: true,
        icon: Users,
        gradient: 'primary-gradient',
        shadow: 'shadow-primary/25',
    },
    {
        label: 'Total Revenue',
        value: '₦34.2M',
        change: '+8.7%',
        up: true,
        icon: DollarSign,
        gradient: 'success-gradient',
        shadow: 'shadow-success/25',
    },
    {
        label: 'Transactions',
        value: '18,492',
        change: '+21.3%',
        up: true,
        icon: ArrowRightLeft,
        gradient: 'secondary-gradient',
        shadow: 'shadow-secondary/25',
    },
    {
        label: 'Failed Txns',
        value: '142',
        change: '-5.1%',
        up: false,
        icon: TrendingDown,
        gradient: 'error-gradient',
        shadow: 'shadow-error/25',
    },
];

const SERVICES = [
    { label: 'Data Plans', icon: Wifi, color: 'text-primary', bg: 'bg-primary/10', txns: 7840 },
    { label: 'Airtime', icon: Phone, color: 'text-secondary', bg: 'bg-secondary/10', txns: 5230 },
    { label: 'Cable TV', icon: Tv, color: 'text-purple', bg: 'bg-purple/10', txns: 2610 },
    { label: 'Electricity', icon: Zap, color: 'text-success', bg: 'bg-success/10', txns: 2045 },
    { label: 'Water', icon: Droplets, color: 'text-accent', bg: 'bg-accent/10', txns: 933 },
];

const fmt = (n: number) =>
    new Intl.NumberFormat('en-NG', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

export function Dashboard() {
    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Dashboard Overview"
                subtitle="Welcome back, ADS Admin  •  Last updated just now"
                actions={
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </Button>
                }
            />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 stagger">
                {STATS.map((s) => (
                    <GlassCard key={s.label} className="flex flex-col gap-4 animate-fade-in">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-text-secondary font-semibold uppercase tracking-wide">{s.label}</p>
                                <h3 className="text-2xl font-bold font-heading mt-1 text-text-primary">{s.value}</h3>
                            </div>
                            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center shadow-md ${s.shadow}`}>
                                <s.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            {s.up
                                ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                                : <TrendingDown className="w-3.5 h-3.5 text-error" />}
                            <span className={s.up ? 'text-success font-semibold' : 'text-error font-semibold'}>{s.change}</span>
                            <span className="text-text-secondary">vs last month</span>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Revenue chart + service breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Area chart */}
                <GlassCard className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-base font-bold font-heading">Revenue Overview</h3>
                            <p className="text-xs text-text-secondary mt-0.5">Monthly revenue trend (₦)</p>
                        </div>
                        <Badge variant="success" dot={false}>Live</Badge>
                    </div>
                    <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#007AFF" stopOpacity={0.25} />
                                        <stop offset="100%" stopColor="#007AFF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} tickFormatter={fmt} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
                                    formatter={(v: number) => [`₦${fmt(v)}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#007AFF" strokeWidth={2.5} fill="url(#revGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Service mix */}
                <GlassCard>
                    <h3 className="text-base font-bold font-heading mb-5">Service Mix</h3>
                    <div className="space-y-3">
                        {serviceData.map((s) => (
                            <div key={s.name}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-text-primary">{s.name}</span>
                                    <span className="text-text-secondary font-semibold">{s.value}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-glass-border overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${s.value}%`, background: s.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-wide text-text-secondary mb-3">Volume by Service</h4>
                        <div className="h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={SERVICES.map(s => ({ name: s.label.split(' ')[0], value: s.txns }))} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 10 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 10 }} tickFormatter={fmt} />
                                    <Tooltip
                                        contentStyle={{ background: 'var(--card-bg)', border: 'none', borderRadius: '10px', boxShadow: 'var(--shadow-lg)', fontSize: '12px' }}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {serviceData.map((s) => <Cell key={s.name} fill={s.color} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Services grid + recent transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Active services */}
                <GlassCard>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold font-heading">Active Services</h3>
                        <Link to="/dashboard/services" className="text-xs text-primary hover:underline flex items-center gap-1">
                            Manage <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {SERVICES.map((svc) => (
                            <div key={svc.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/3 transition-colors">
                                <div className={`w-9 h-9 rounded-xl ${svc.bg} flex items-center justify-center`}>
                                    <svc.icon className={`w-4.5 h-4.5 ${svc.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-text-primary">{svc.label}</p>
                                    <p className="text-xs text-text-secondary">{svc.txns.toLocaleString()} transactions</p>
                                </div>
                                <Badge variant="success" dot={false}>Active</Badge>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Recent transactions */}
                <GlassCard className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold font-heading">Recent Transactions</h3>
                        <Link to="/dashboard/transactions" className="text-xs text-primary hover:underline flex items-center gap-1">
                            View all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RECENT_TRANSACTIONS.map((t) => (
                                    <tr key={t.id}>
                                        <td className="font-mono text-xs text-text-secondary">{t.id}</td>
                                        <td className="font-medium">{t.user}</td>
                                        <td className="text-text-secondary">{t.type}</td>
                                        <td className="font-semibold text-text-primary">{t.amount}</td>
                                        <td>
                                            <Badge
                                                variant={t.status === 'success' ? 'success' : t.status === 'error' ? 'error' : 'warning'}
                                            >
                                                {t.status}
                                            </Badge>
                                        </td>
                                        <td className="text-text-secondary text-xs">{t.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
