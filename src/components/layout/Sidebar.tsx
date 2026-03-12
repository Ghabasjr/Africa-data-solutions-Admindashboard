import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard, Users, BarChart3, Settings,
    Smartphone, ArrowRightLeft, Zap, ChevronRight, LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', group: 'main' },
    { icon: Users, label: 'Users', path: '/dashboard/users', group: 'main' },
    { icon: ArrowRightLeft, label: 'Transactions', path: '/dashboard/transactions', group: 'main' },
    { icon: Smartphone, label: 'Services', path: '/dashboard/services', group: 'manage' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', group: 'manage' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', group: 'system' },
];

const GROUPS: Record<string, string> = { main: 'Main', manage: 'Manage', system: 'System' };

export function Sidebar({ className }: { className?: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const grouped = Object.entries(
        NAV_ITEMS.reduce<Record<string, typeof NAV_ITEMS>>((acc, item) => {
            (acc[item.group] = acc[item.group] || []).push(item);
            return acc;
        }, {})
    );

    const isActive = (path: string) =>
        path === '/dashboard'
            ? location.pathname === '/dashboard'
            : location.pathname.startsWith(path);

    return (
        <aside
            className={cn(
                'sidebar-bg h-screen flex flex-col fixed left-0 top-0 z-20 transition-all duration-300',
                collapsed ? 'w-[70px]' : 'w-64',
                className
            )}
        >
            {/* Logo */}
            <div className={cn('flex items-center gap-3 p-5 border-b border-glass-border shrink-0', collapsed && 'justify-center px-3')}>
                <div className="w-9 h-9 rounded-xl primary-gradient flex items-center justify-center shrink-0 shadow-md shadow-primary/30">
                    <Zap className="w-4.5 h-4.5 text-white" />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <h1 className="font-heading text-lg font-bold text-text-primary leading-tight">ADS Admin</h1>
                        <p className="text-[10px] text-text-secondary">Africa Data Solutions</p>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
                {grouped.map(([groupKey, items]) => (
                    <div key={groupKey} className="mb-3">
                        {!collapsed && (
                            <p className="px-5 mb-1 text-[10px] font-bold tracking-widest uppercase text-text-secondary/60">
                                {GROUPS[groupKey]}
                            </p>
                        )}
                        {items.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    title={collapsed ? item.label : undefined}
                                    className={cn(
                                        'flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium mb-0.5',
                                        active
                                            ? 'primary-gradient text-white shadow-md shadow-primary/25'
                                            : 'text-text-secondary hover:bg-primary/5 hover:text-primary',
                                        collapsed && 'justify-center px-2'
                                    )}
                                >
                                    <item.icon className={cn('w-5 h-5 shrink-0', active ? 'text-white' : 'text-text-secondary group-hover:text-primary')} />
                                    {!collapsed && <span className="truncate">{item.label}</span>}
                                    {!collapsed && active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/60" />}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Bottom: admin + collapse */}
            <div className="p-3 border-t border-glass-border shrink-0 space-y-2">
                <button
                    onClick={() => navigate('/')}
                    className={cn(
                        'flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-colors',
                        collapsed && 'justify-center'
                    )}
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    {!collapsed && 'Sign out'}
                </button>

                <div className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/10', collapsed && 'justify-center px-2')}>
                    <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
                        AD
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">ADS Admin</p>
                            <p className="text-[10px] text-text-secondary truncate">Super Admin</p>
                        </div>
                    )}
                </div>

                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(c => !c)}
                    className="flex items-center justify-center w-full py-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors text-xs gap-1"
                >
                    <ChevronRight className={cn('w-4 h-4 transition-transform', !collapsed && 'rotate-180')} />
                    {!collapsed && 'Collapse'}
                </button>
            </div>
        </aside>
    );
}
