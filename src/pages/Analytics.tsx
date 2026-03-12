import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line,
    PieChart, Pie, Legend,
} from 'recharts';

const monthlyRevenue = [
    { month: 'Jan', data: 1200000, airtime: 600000, cable: 800000, electricity: 400000, water: 150000 },
    { month: 'Feb', data: 1800000, airtime: 750000, cable: 900000, electricity: 550000, water: 200000 },
    { month: 'Mar', data: 1500000, airtime: 680000, cable: 780000, electricity: 480000, water: 175000 },
    { month: 'Apr', data: 2200000, airtime: 920000, cable: 1100000, electricity: 620000, water: 220000 },
    { month: 'May', data: 2000000, airtime: 850000, cable: 1000000, electricity: 580000, water: 195000 },
    { month: 'Jun', data: 2700000, airtime: 1100000, cable: 1300000, electricity: 720000, water: 260000 },
    { month: 'Jul', data: 3100000, airtime: 1250000, cable: 1500000, electricity: 850000, water: 310000 },
];

const userGrowth = [
    { month: 'Jan', users: 8400, churned: 210 },
    { month: 'Feb', users: 10200, churned: 180 },
    { month: 'Mar', users: 11800, churned: 240 },
    { month: 'Apr', users: 14000, churned: 195 },
    { month: 'May', users: 16500, churned: 260 },
    { month: 'Jun', users: 19200, churned: 310 },
    { month: 'Jul', users: 24318, churned: 280 },
];

const pieData = [
    { name: 'Data Plans', value: 42, fill: '#007AFF' },
    { name: 'Airtime', value: 28, fill: '#FF9500' },
    { name: 'Cable TV', value: 14, fill: '#AF52DE' },
    { name: 'Electricity', value: 11, fill: '#34C759' },
    { name: 'Water', value: 5, fill: '#5AC8FA' },
];

const topProviders = [
    { name: 'MTN', revenue: 14200000, txns: 6840, color: '#FFCC00' },
    { name: 'Airtel', revenue: 8700000, txns: 3920, color: '#E50000' },
    { name: 'DSTV', revenue: 6500000, txns: 1420, color: '#0062B1' },
    { name: 'EKEDC', revenue: 5100000, txns: 1020, color: '#34C759' },
    { name: 'Glo', revenue: 4300000, txns: 2100, color: '#008000' },
];

const fmt = (n: number) => `₦${new Intl.NumberFormat('en-NG', { notation: 'compact', maximumFractionDigits: 1 }).format(n)}`;

const KPI_CARDS = [
    { label: 'MoM Revenue Growth', value: '+21.3%', up: true, sub: '₦34.2M this month' },
    { label: 'User Retention Rate', value: '98.1%', up: true, sub: '↓ 0.4% from Jun' },
    { label: 'Avg. Order Value', value: '₦8,240', up: true, sub: '↑ 12% vs last month' },
    { label: 'Failed Txn Rate', value: '0.77%', up: false, sub: '142 failed of 18,492' },
];

export function Analytics() {
    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Analytics"
                subtitle="Business intelligence & performance metrics"
                actions={
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" /> Export Report
                    </Button>
                }
            />

            {/* KPI row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 stagger">
                {KPI_CARDS.map(k => (
                    <GlassCard key={k.label} className="animate-fade-in">
                        <p className="text-xs font-bold uppercase tracking-wide text-text-secondary">{k.label}</p>
                        <div className="flex items-end gap-2 mt-1">
                            <p className="text-2xl font-bold font-heading text-text-primary">{k.value}</p>
                            {k.up
                                ? <TrendingUp className="w-4 h-4 text-success mb-0.5" />
                                : <TrendingDown className="w-4 h-4 text-error mb-0.5" />}
                        </div>
                        <p className="text-xs text-text-secondary mt-1">{k.sub}</p>
                    </GlassCard>
                ))}
            </div>

            {/* Revenue stacked area + pie */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <GlassCard className="lg:col-span-2">
                    <h3 className="text-base font-bold font-heading mb-1">Revenue by Service</h3>
                    <p className="text-xs text-text-secondary mb-5">Monthly breakdown across all service categories</p>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                                <defs>
                                    {[
                                        { id: 'gData', c: '#007AFF' },
                                        { id: 'gAirtime', c: '#FF9500' },
                                        { id: 'gCable', c: '#AF52DE' },
                                        { id: 'gElectricity', c: '#34C759' },
                                        { id: 'gWater', c: '#5AC8FA' },
                                    ].map(g => (
                                        <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={g.c} stopOpacity={0.35} />
                                            <stop offset="100%" stopColor={g.c} stopOpacity={0.02} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} tickFormatter={fmt} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', fontSize: 12 }}
                                    formatter={(v: number, name: string) => [fmt(v), name]}
                                />
                                <Area type="monotone" dataKey="data" name="Data Plans" stroke="#007AFF" strokeWidth={2} fill="url(#gData)" stackId="1" />
                                <Area type="monotone" dataKey="airtime" name="Airtime" stroke="#FF9500" strokeWidth={2} fill="url(#gAirtime)" stackId="1" />
                                <Area type="monotone" dataKey="cable" name="Cable TV" stroke="#AF52DE" strokeWidth={2} fill="url(#gCable)" stackId="1" />
                                <Area type="monotone" dataKey="electricity" name="Electricity" stroke="#34C759" strokeWidth={2} fill="url(#gElectricity)" stackId="1" />
                                <Area type="monotone" dataKey="water" name="Water" stroke="#5AC8FA" strokeWidth={2} fill="url(#gWater)" stackId="1" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-base font-bold font-heading mb-1">Service Share</h3>
                    <p className="text-xs text-text-secondary mb-4">Transaction volume distribution</p>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%" cy="50%"
                                    innerRadius={55} outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieData.map((e) => <Cell key={e.name} fill={e.fill} />)}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: 'none', borderRadius: '10px', boxShadow: 'var(--shadow-lg)', fontSize: 12 }}
                                    formatter={(v: number) => [`${v}%`]}
                                />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            {/* User growth + top providers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <GlassCard>
                    <h3 className="text-base font-bold font-heading mb-1">User Growth</h3>
                    <p className="text-xs text-text-secondary mb-5">New vs churned users monthly</p>
                    <div className="h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowth} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', fontSize: 12 }}
                                />
                                <Line type="monotone" dataKey="users" name="Total Users" stroke="#007AFF" strokeWidth={2.5} dot={false} />
                                <Line type="monotone" dataKey="churned" name="Churned" stroke="#FF3B30" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-base font-bold font-heading mb-1">Top Providers</h3>
                    <p className="text-xs text-text-secondary mb-5">Revenue contribution by provider</p>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topProviders} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 10 }} tickFormatter={fmt} />
                                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#636366', fontSize: 11 }} width={48} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: 'none', borderRadius: '10px', boxShadow: 'var(--shadow-lg)', fontSize: 12 }}
                                    formatter={(v: number) => [fmt(v), 'Revenue']}
                                />
                                <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
                                    {topProviders.map(p => <Cell key={p.name} fill={p.color} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {topProviders.map(p => (
                            <div key={p.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                                    <span className="text-text-primary font-medium">{p.name}</span>
                                </div>
                                <span className="text-text-secondary">{p.txns.toLocaleString()} txns</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
