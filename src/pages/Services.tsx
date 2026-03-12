import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Wifi, Phone, Tv, Zap, Droplets, Settings, ToggleLeft, ToggleRight, ChevronRight, RefreshCw } from 'lucide-react';

type ServiceStatus = 'active' | 'maintenance' | 'inactive';

interface ServiceProvider {
    name: string;
    logo: string;
    active: boolean;
}

interface Service {
    id: string;
    name: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    color: string;
    bg: string;
    gradient: string;
    status: ServiceStatus;
    uptime: number;
    todayTxns: number;
    todayRevenue: string;
    providers: ServiceProvider[];
}

const SERVICES: Service[] = [
    {
        id: 'data',
        name: 'Data Plans',
        description: 'Mobile internet data bundles for all Nigerian networks',
        icon: Wifi,
        color: 'text-primary',
        bg: 'bg-primary/10',
        gradient: 'primary-gradient',
        status: 'active',
        uptime: 99.8,
        todayTxns: 312,
        todayRevenue: '₦1.56M',
        providers: [
            { name: 'MTN', logo: 'MT', active: true },
            { name: 'Airtel', logo: 'AT', active: true },
            { name: 'Glo', logo: 'GL', active: true },
            { name: '9mobile', logo: '9M', active: true },
        ],
    },
    {
        id: 'airtime',
        name: 'Airtime',
        description: 'Instant airtime top-up for all Nigerian networks',
        icon: Phone,
        color: 'text-secondary',
        bg: 'bg-secondary/10',
        gradient: 'secondary-gradient',
        status: 'active',
        uptime: 99.9,
        todayTxns: 208,
        todayRevenue: '₦524K',
        providers: [
            { name: 'MTN', logo: 'MT', active: true },
            { name: 'Airtel', logo: 'AT', active: true },
            { name: 'Glo', logo: 'GL', active: true },
            { name: '9mobile', logo: '9M', active: false },
        ],
    },
    {
        id: 'cable',
        name: 'Cable TV',
        description: 'Subscription payments for DSTV, GOtv, Startimes',
        icon: Tv,
        color: 'text-purple',
        bg: 'bg-purple/10',
        gradient: 'purple-gradient',
        status: 'active',
        uptime: 98.4,
        todayTxns: 104,
        todayRevenue: '₦1.01M',
        providers: [
            { name: 'DSTV', logo: 'DS', active: true },
            { name: 'GOtv', logo: 'GO', active: true },
            { name: 'Startimes', logo: 'ST', active: true },
        ],
    },
    {
        id: 'electricity',
        name: 'Electricity',
        description: 'PHCN prepaid and postpaid electricity token purchase',
        icon: Zap,
        color: 'text-success',
        bg: 'bg-success/10',
        gradient: 'success-gradient',
        status: 'maintenance',
        uptime: 95.2,
        todayTxns: 82,
        todayRevenue: '₦1.23M',
        providers: [
            { name: 'EKEDC', logo: 'EK', active: true },
            { name: 'IKEDC', logo: 'IK', active: false },
            { name: 'AEDC', logo: 'AE', active: true },
            { name: 'PHED', logo: 'PH', active: true },
        ],
    },
    {
        id: 'water',
        name: 'Water Bills',
        description: 'Water bill payments for Lagos, Abuja, and Port Harcourt',
        icon: Droplets,
        color: 'text-accent',
        bg: 'bg-accent/10',
        gradient: 'indigo-gradient',
        status: 'active',
        uptime: 97.6,
        todayTxns: 37,
        todayRevenue: '₦277K',
        providers: [
            { name: 'LWC', logo: 'LW', active: true },
            { name: 'LAWMA', logo: 'LA', active: true },
            { name: 'RUWASA', logo: 'RW', active: false },
        ],
    },
];

const statusVariant: Record<ServiceStatus, 'success' | 'warning' | 'error'> = {
    active: 'success',
    maintenance: 'warning',
    inactive: 'error',
};

export function Services() {
    const [services, setServices] = useState(SERVICES);
    const [selected, setSelected] = useState<string | null>(null);

    const toggleStatus = (id: string) => {
        setServices(prev => prev.map(s =>
            s.id === id
                ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
                : s
        ));
    };

    const selectedService = services.find(s => s.id === selected);

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Services"
                subtitle="Manage all Africa Data Solutions service modules"
                actions={
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Refresh Status
                    </Button>
                }
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Service list */}
                <div className="xl:col-span-2 space-y-4 stagger">
                    {services.map((svc) => (
                        <GlassCard
                            key={svc.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-xl animate-fade-in
                                ${selected === svc.id ? 'ring-2 ring-primary/40 shadow-lg shadow-primary/10' : ''}`}
                            onClick={() => setSelected(svc.id === selected ? null : svc.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${svc.gradient} flex items-center justify-center shadow-md shrink-0`}>
                                    <svc.icon className="w-6 h-6 text-white" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-text-primary">{svc.name}</h3>
                                        <Badge variant={statusVariant[svc.status]}>{svc.status}</Badge>
                                    </div>
                                    <p className="text-sm text-text-secondary mt-0.5 truncate">{svc.description}</p>
                                </div>

                                <div className="hidden sm:flex items-center gap-6 shrink-0 text-center">
                                    <div>
                                        <p className="text-xs text-text-secondary">Today Txns</p>
                                        <p className="text-sm font-bold text-text-primary">{svc.todayTxns}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-secondary">Revenue</p>
                                        <p className="text-sm font-bold text-text-primary">{svc.todayRevenue}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-secondary">Uptime</p>
                                        <p className={`text-sm font-bold ${svc.uptime > 98 ? 'text-success' : svc.uptime > 95 ? 'text-warning' : 'text-error'}`}>{svc.uptime}%</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 ml-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleStatus(svc.id); }}
                                        className="transition-colors"
                                        title="Toggle service"
                                    >
                                        {svc.status === 'active'
                                            ? <ToggleRight className="w-7 h-7 text-success" />
                                            : <ToggleLeft className="w-7 h-7 text-text-secondary" />
                                        }
                                    </button>
                                    <ChevronRight className={`w-4 h-4 text-text-secondary transition-transform ${selected === svc.id ? 'rotate-90' : ''}`} />
                                </div>
                            </div>

                            {/* Providers (expanded) */}
                            {selected === svc.id && (
                                <div className="mt-5 pt-5 border-t border-glass-border animate-fade-in">
                                    <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">Providers</p>
                                    <div className="flex flex-wrap gap-3">
                                        {svc.providers.map(p => (
                                            <div key={p.name} className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors
                                                ${p.active ? 'border-success/30 bg-success/5' : 'border-glass-border bg-glass-border/20'}`}>
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white
                                                    ${p.active ? svc.gradient : 'bg-text-secondary/30'}`}>
                                                    {p.logo}
                                                </div>
                                                <span className="text-sm font-medium text-text-primary">{p.name}</span>
                                                <Badge variant={p.active ? 'success' : 'error'} dot={false}>
                                                    {p.active ? 'On' : 'Off'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Uptime bar */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-text-secondary">Service Uptime (30d)</span>
                                            <span className="font-semibold text-text-primary">{svc.uptime}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-glass-border overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${svc.uptime}%`,
                                                    background: svc.uptime > 98 ? '#34C759' : svc.uptime > 95 ? '#FF9500' : '#FF3B30',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <Button size="sm" variant="outline" className="gap-2">
                                            <Settings className="w-3.5 h-3.5" /> Configure
                                        </Button>
                                        <Button size="sm" variant="ghost" className="gap-2 text-error hover:bg-error/8">
                                            Suspend
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    ))}
                </div>

                {/* Right panel: summary */}
                <div className="space-y-4">
                    <GlassCard>
                        <h3 className="text-base font-bold font-heading mb-4">Service Health</h3>
                        <div className="space-y-3">
                            {services.map(svc => (
                                <div key={svc.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg ${svc.bg} flex items-center justify-center`}>
                                        <svc.icon className={`w-4 h-4 ${svc.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs font-semibold text-text-primary truncate">{svc.name}</p>
                                            <p className="text-xs text-text-secondary">{svc.uptime}%</p>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-glass-border overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${svc.uptime}%`,
                                                    background: svc.uptime > 98 ? '#34C759' : svc.uptime > 95 ? '#FF9500' : '#FF3B30',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="text-base font-bold font-heading mb-4">Today's Summary</h3>
                        <div className="space-y-3">
                            {services.map(svc => (
                                <div key={svc.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svc.icon className={`w-4 h-4 ${svc.color}`} />
                                        <span className="text-sm text-text-primary">{svc.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-text-primary">{svc.todayRevenue}</p>
                                        <p className="text-[10px] text-text-secondary">{svc.todayTxns} txns</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
