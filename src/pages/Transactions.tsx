import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Search, Download, ChevronLeft, ChevronRight, Wifi, Phone, Tv, Zap, Droplets } from 'lucide-react';

type TxnStatus = 'success' | 'failed' | 'pending';
type ServiceType = 'Data' | 'Airtime' | 'Cable TV' | 'Electricity' | 'Water';

interface Transaction {
    id: string;
    user: string;
    service: ServiceType;
    provider: string;
    amount: number;
    fee: number;
    status: TxnStatus;
    date: string;
    ref: string;
}

const SERVICE_ICONS: Record<ServiceType, React.FC<{ className?: string }>> = {
    'Data': Wifi,
    'Airtime': Phone,
    'Cable TV': Tv,
    'Electricity': Zap,
    'Water': Droplets,
};

const SERVICE_COLORS: Record<ServiceType, string> = {
    'Data': 'bg-primary/10 text-primary',
    'Airtime': 'bg-secondary/10 text-secondary',
    'Cable TV': 'bg-purple/10 text-purple',
    'Electricity': 'bg-success/10 text-success',
    'Water': 'bg-accent/10 text-accent',
};

const TRANSACTIONS: Transaction[] = [
    { id: 'T-9001', user: 'Emeka Obi', service: 'Data', provider: 'MTN', amount: 5000, fee: 50, status: 'success', date: '2026-03-12T13:45', ref: 'ADS20260312001' },
    { id: 'T-9000', user: 'Amara Kalu', service: 'Airtime', provider: 'Airtel', amount: 2500, fee: 25, status: 'success', date: '2026-03-12T13:12', ref: 'ADS20260312002' },
    { id: 'T-8999', user: 'Chidi Nwosu', service: 'Cable TV', provider: 'DSTV', amount: 9700, fee: 97, status: 'success', date: '2026-03-12T12:50', ref: 'ADS20260312003' },
    { id: 'T-8998', user: 'Fatima Bello', service: 'Electricity', provider: 'EKEDC', amount: 15000, fee: 150, status: 'failed', date: '2026-03-12T11:22', ref: 'ADS20260312004' },
    { id: 'T-8997', user: 'Seun Adebayo', service: 'Data', provider: 'Glo', amount: 3200, fee: 32, status: 'pending', date: '2026-03-12T10:05', ref: 'ADS20260312005' },
    { id: 'T-8996', user: 'Ngozi Eze', service: 'Water', provider: 'LWC', amount: 7500, fee: 75, status: 'success', date: '2026-03-12T09:40', ref: 'ADS20260312006' },
    { id: 'T-8995', user: 'Tunde Fashola', service: 'Airtime', provider: '9mobile', amount: 1000, fee: 10, status: 'success', date: '2026-03-11T22:14', ref: 'ADS20260311001' },
    { id: 'T-8994', user: 'Chioma Okafor', service: 'Cable TV', provider: 'GOtv', amount: 4900, fee: 49, status: 'success', date: '2026-03-11T21:03', ref: 'ADS20260311002' },
    { id: 'T-8993', user: 'Olawale Idowu', service: 'Electricity', provider: 'IKEDC', amount: 20000, fee: 200, status: 'failed', date: '2026-03-11T19:55', ref: 'ADS20260311003' },
    { id: 'T-8992', user: 'Adaeze Okon', service: 'Data', provider: 'MTN', amount: 10000, fee: 100, status: 'success', date: '2026-03-11T18:30', ref: 'ADS20260311004' },
    { id: 'T-8991', user: 'Kayode Alabi', service: 'Airtime', provider: 'MTN', amount: 5000, fee: 50, status: 'pending', date: '2026-03-11T17:10', ref: 'ADS20260311005' },
    { id: 'T-8990', user: 'Blessing Oke', service: 'Water', provider: 'LAWMA', amount: 3500, fee: 35, status: 'success', date: '2026-03-11T15:45', ref: 'ADS20260311006' },
];

const PAGE_SIZE = 8;
const statusBadge: Record<TxnStatus, 'success' | 'error' | 'warning'> = {
    success: 'success', failed: 'error', pending: 'warning',
};

const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

export function Transactions() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatus] = useState<TxnStatus | 'all'>('all');
    const [serviceFilter, setSvc] = useState<ServiceType | 'all'>('all');
    const [page, setPage] = useState(1);

    const filtered = TRANSACTIONS.filter(t => {
        const src = `${t.user} ${t.id} ${t.ref}`.toLowerCase();
        return src.includes(search.toLowerCase()) &&
            (statusFilter === 'all' || t.status === statusFilter) &&
            (serviceFilter === 'all' || t.service === serviceFilter);
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const totalRevenue = TRANSACTIONS.filter(t => t.status === 'success').reduce((s, t) => s + t.amount, 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Transactions"
                subtitle={`${TRANSACTIONS.length} total transactions`}
                actions={
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" /> Export CSV
                    </Button>
                }
            />

            {/* Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
                {[
                    { label: 'Total Volume', value: fmt(TRANSACTIONS.reduce((s, t) => s + t.amount, 0)), cls: '' },
                    { label: 'Success Revenue', value: fmt(totalRevenue), cls: 'text-success' },
                    { label: 'Failed', value: TRANSACTIONS.filter(t => t.status === 'failed').length, cls: 'text-error' },
                    { label: 'Pending', value: TRANSACTIONS.filter(t => t.status === 'pending').length, cls: 'text-warning' },
                ].map(c => (
                    <GlassCard key={c.label} className="p-4 animate-fade-in">
                        <p className="text-xs font-bold uppercase tracking-wide text-text-secondary">{c.label}</p>
                        <p className={`text-xl font-bold font-heading mt-1 ${c.cls || 'text-text-primary'}`}>{c.value}</p>
                    </GlassCard>
                ))}
            </div>

            {/* Table */}
            <GlassCard className="p-0 overflow-hidden">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3 p-4 border-b border-glass-border">
                    <div className="flex items-center gap-2 flex-1 h-9 px-3 rounded-xl border border-glass-border bg-surface/60 text-sm min-w-[180px]">
                        <Search className="w-4 h-4 shrink-0 text-text-secondary" />
                        <input
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search by user or ref…"
                            className="bg-transparent outline-none flex-1 text-text-primary placeholder:text-text-secondary text-sm"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={e => { setStatus(e.target.value as TxnStatus | 'all'); setPage(1); }}
                        className="h-9 px-3 rounded-xl border border-glass-border bg-surface/60 text-sm text-text-primary outline-none cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <select
                        value={serviceFilter}
                        onChange={e => { setSvc(e.target.value as ServiceType | 'all'); setPage(1); }}
                        className="h-9 px-3 rounded-xl border border-glass-border bg-surface/60 text-sm text-text-primary outline-none cursor-pointer"
                    >
                        <option value="all">All Services</option>
                        {(['Data', 'Airtime', 'Cable TV', 'Electricity', 'Water'] as ServiceType[]).map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Txn ID</th>
                                <th>User</th>
                                <th>Service</th>
                                <th>Provider</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map((t) => {
                                const Icon = SERVICE_ICONS[t.service];
                                return (
                                    <tr key={t.id}>
                                        <td className="font-mono text-xs text-text-secondary">{t.id}</td>
                                        <td className="font-medium text-text-primary">{t.user}</td>
                                        <td>
                                            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold ${SERVICE_COLORS[t.service]}`}>
                                                <Icon className="w-3.5 h-3.5" />
                                                {t.service}
                                            </div>
                                        </td>
                                        <td className="text-text-secondary text-xs">{t.provider}</td>
                                        <td className="font-semibold text-text-primary">{fmt(t.amount)}</td>
                                        <td className="text-text-secondary text-xs">{fmt(t.fee)}</td>
                                        <td><Badge variant={statusBadge[t.status]}>{t.status}</Badge></td>
                                        <td className="text-text-secondary text-xs whitespace-nowrap">
                                            {new Date(t.date).toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-glass-border">
                    <p className="text-xs text-text-secondary">
                        {filtered.length === 0 ? 'No results' : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
                    </p>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 disabled:opacity-40 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => setPage(i + 1)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'primary-gradient text-white' : 'text-text-secondary hover:text-primary hover:bg-primary/8'}`}>
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 disabled:opacity-40 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
