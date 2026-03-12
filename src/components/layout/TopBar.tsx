import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Sun, Moon, X, Check } from 'lucide-react';
import { Button } from '../Button';

interface TopBarProps {
    onMenuClick?: () => void;
}

const NOTIFICATIONS = [
    { id: 1, title: 'New user registered', desc: 'Emeka Obi joined via mobile app', time: '2m ago', unread: true, type: 'user' },
    { id: 2, title: 'Transaction completed', desc: '₦5,000 airtime purchase successful', time: '8m ago', unread: true, type: 'txn' },
    { id: 3, title: 'Service alert', desc: 'Electricity API latency spike detected', time: '1h ago', unread: false, type: 'alert' },
    { id: 4, title: 'New user registered', desc: 'Amara Kalu signed up via web', time: '2h ago', unread: false, type: 'user' },
    { id: 5, title: 'Transaction completed', desc: '₦12,000 data bundle purchased', time: '3h ago', unread: false, type: 'txn' },
];

export function TopBar({ onMenuClick }: TopBarProps) {
    const [dark, setDark] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const notifRef = useRef<HTMLDivElement>(null);

    // Dark mode toggle
    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllRead = () =>
        setNotifications(n => n.map(x => ({ ...x, unread: false })));

    return (
        <header className="h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-glass-border">
            {/* Left */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
                    <Menu className="w-5 h-5" />
                </Button>
                <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl border border-glass-border bg-surface/60 backdrop-blur text-sm w-56 text-text-secondary">
                    <Search className="w-4 h-4 shrink-0" />
                    <span className="truncate">Search…</span>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Dark mode */}
                <button
                    onClick={() => setDark(d => !d)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors"
                >
                    {dark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(o => !o)}
                        className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors"
                    >
                        <Bell className="w-4.5 h-4.5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-white text-[9px] font-bold flex items-center justify-center animate-pulse-ring">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 top-12 w-80 glass-card animate-scale-in z-50 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
                                <span className="text-sm font-bold font-heading">Notifications</span>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Mark all read
                                        </button>
                                    )}
                                    <button onClick={() => setNotifOpen(false)} className="text-text-secondary hover:text-error">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-80 overflow-y-auto divide-y divide-glass-border">
                                {notifications.map(n => (
                                    <div key={n.id} className={`px-4 py-3 flex gap-3 transition-colors hover:bg-primary/3 ${n.unread ? 'bg-primary/5' : ''}`}>
                                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? 'bg-primary animate-pulse-ring' : 'bg-transparent'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-text-primary truncate">{n.title}</p>
                                            <p className="text-xs text-text-secondary mt-0.5 truncate">{n.desc}</p>
                                            <p className="text-[10px] text-text-secondary/60 mt-1">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl primary-gradient flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary/25 cursor-pointer hover:scale-105 transition-transform">
                    AD
                </div>
            </div>
        </header>
    );
}
