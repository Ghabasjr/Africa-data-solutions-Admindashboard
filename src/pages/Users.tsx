import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Search, Filter, UserPlus, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

type UserStatus = 'active' | 'inactive' | 'suspended';

interface AppUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    joined: string;
    status: UserStatus;
    spent: string;
    txns: number;
}

const USERS: AppUser[] = [
    { id: 'U-001', name: 'Emeka Obi', email: 'emeka@gmail.com', phone: '0801 234 5678', joined: '2025-01-10', status: 'active', spent: '₦182,400', txns: 64 },
    { id: 'U-002', name: 'Amara Kalu', email: 'amara@yahoo.com', phone: '0802 345 6789', joined: '2025-02-14', status: 'active', spent: '₦97,200', txns: 38 },
    { id: 'U-003', name: 'Chidi Nwosu', email: 'chidi@hotmail.com', phone: '0803 456 7890', joined: '2025-03-01', status: 'suspended', spent: '₦43,500', txns: 17 },
    { id: 'U-004', name: 'Fatima Bello', email: 'fatima@gmail.com', phone: '0804 567 8901', joined: '2025-03-22', status: 'active', spent: '₦230,900', txns: 91 },
    { id: 'U-005', name: 'Seun Adebayo', email: 'seun@gmail.com', phone: '0805 678 9012', joined: '2025-04-05', status: 'inactive', spent: '₦18,200', txns: 6 },
    { id: 'U-006', name: 'Ngozi Eze', email: 'ngozi@outlook.com', phone: '0806 789 0123', joined: '2025-04-18', status: 'active', spent: '₦315,700', txns: 112 },
    { id: 'U-007', name: 'Tunde Fashola', email: 'tunde@gmail.com', phone: '0807 890 1234', joined: '2025-05-02', status: 'active', spent: '₦74,100', txns: 29 },
    { id: 'U-008', name: 'Chioma Okafor', email: 'chioma@gmail.com', phone: '0808 901 2345', joined: '2025-05-15', status: 'active', spent: '₦121,300', txns: 47 },
    { id: 'U-009', name: 'Olawale Idowu', email: 'wale@gmail.com', phone: '0809 012 3456', joined: '2025-06-01', status: 'inactive', spent: '₦8,500', txns: 3 },
    { id: 'U-010', name: 'Adaeze Okonkwo', email: 'adaeze@gmail.com', phone: '0810 123 4567', joined: '2025-06-20', status: 'active', spent: '₦267,800', txns: 98 },
    { id: 'U-011', name: 'Kayode Alabi', email: 'kayode@yahoo.com', phone: '0811 234 5678', joined: '2025-07-04', status: 'active', spent: '₦55,600', txns: 22 },
    { id: 'U-012', name: 'Blessing Okorie', email: 'blessing@gmail.com', phone: '0812 345 6789', joined: '2025-07-18', status: 'suspended', spent: '₦12,900', txns: 5 },
];

const PAGE_SIZE = 8;

const statusVariant: Record<UserStatus, 'success' | 'error' | 'warning'> = {
    active: 'success',
    inactive: 'warning',
    suspended: 'error',
};

export function Users() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<UserStatus | 'all'>('all');
    const [page, setPage] = useState(1);

    const filtered = USERS.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || u.status === filter;
        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const counts = {
        all: USERS.length,
        active: USERS.filter(u => u.status === 'active').length,
        inactive: USERS.filter(u => u.status === 'inactive').length,
        suspended: USERS.filter(u => u.status === 'suspended').length,
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Users"
                subtitle={`${USERS.length} total registered users`}
                actions={
                    <Button size="sm" className="gap-2">
                        <UserPlus className="w-4 h-4" /> Add User
                    </Button>
                }
            />

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
                {(['all', 'active', 'inactive', 'suspended'] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => { setFilter(s); setPage(1); }}
                        className={`glass-card p-4 text-left transition-all duration-200 hover:shadow-lg animate-fade-in
                            ${filter === s ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/10' : ''}`}
                    >
                        <p className="text-xs font-bold uppercase tracking-wide text-text-secondary capitalize">{s}</p>
                        <p className="text-2xl font-bold font-heading mt-1 text-text-primary">{counts[s]}</p>
                    </button>
                ))}
            </div>

            {/* Table */}
            <GlassCard className="p-0 overflow-hidden">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-glass-border">
                    <div className="flex items-center gap-2 flex-1 h-9 px-3 rounded-xl border border-glass-border bg-surface/60 text-sm text-text-secondary min-w-0">
                        <Search className="w-4 h-4 shrink-0" />
                        <input
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search users…"
                            className="bg-transparent border-none outline-none flex-1 text-text-primary placeholder:text-text-secondary text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-xl border border-glass-border text-sm text-text-secondary hover:text-primary hover:border-primary/30 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Phone</th>
                                <th>Joined</th>
                                <th>Total Spent</th>
                                <th>Transactions</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-text-primary leading-tight">{u.name}</p>
                                                <p className="text-xs text-text-secondary">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-text-secondary text-xs">{u.phone}</td>
                                    <td className="text-text-secondary text-xs">{new Date(u.joined).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                    <td className="font-semibold">{u.spent}</td>
                                    <td className="text-text-secondary">{u.txns}</td>
                                    <td><Badge variant={statusVariant[u.status]}>{u.status}</Badge></td>
                                    <td>
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-glass-border">
                    <p className="text-xs text-text-secondary">
                        Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                                    ${page === i + 1 ? 'primary-gradient text-white' : 'text-text-secondary hover:text-primary hover:bg-primary/8'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
