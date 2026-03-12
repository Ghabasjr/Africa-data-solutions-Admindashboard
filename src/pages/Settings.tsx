import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { User, Lock, Bell, Key, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react';

const TABS = ['Profile', 'Security', 'Notifications', 'API Keys'] as const;
type Tab = typeof TABS[number];

const API_KEYS = [
    { name: 'Production API Key', key: 'ads_live_sk_xK9mL2pQ8rT4vN7wE3jH6bY1uA5cF0', created: '2025-01-15', last: '2026-03-12', status: 'active' as const },
    { name: 'Sandbox API Key', key: 'ads_test_sk_sD4fG8hJ2kL6mN0pQ3rT7vW1xY5zA9', created: '2025-03-01', last: '2026-03-10', status: 'active' as const },
];

export function Settings() {
    const [activeTab, setActiveTab] = useState<Tab>('Profile');
    const [showPass, setShowPass] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const [notifs, setNotifs] = useState({
        newUser: true,
        txnFailed: true,
        txnSuccess: false,
        lowBalance: true,
        weeklyRpt: true,
        systemAlert: true,
    });

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key).then(() => {
            setCopied(key);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Settings"
                subtitle="Manage your admin account and platform configuration"
            />

            {/* Tab bar */}
            <div className="flex gap-1 p-1 rounded-2xl glass-card w-fit">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                            ${activeTab === tab
                                ? 'primary-gradient text-white shadow-md shadow-primary/25'
                                : 'text-text-secondary hover:text-primary'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Profile */}
            {activeTab === 'Profile' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                    <GlassCard className="flex flex-col items-center gap-4 text-center">
                        <div className="w-20 h-20 rounded-2xl primary-gradient flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30">
                            AD
                        </div>
                        <div>
                            <h3 className="font-bold text-lg font-heading text-text-primary">ADS Admin</h3>
                            <p className="text-sm text-text-secondary">Super Administrator</p>
                        </div>
                        <Badge variant="success">Active</Badge>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                            <User className="w-4 h-4" /> Change Photo
                        </Button>
                    </GlassCard>

                    <GlassCard className="lg:col-span-2 space-y-5">
                        <h3 className="text-base font-bold font-heading">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="First Name" defaultValue="ADS" />
                            <Input label="Last Name" defaultValue="Admin" />
                            <Input label="Email Address" type="email" defaultValue="admin@africadatasolutions.ng" />
                            <Input label="Phone Number" defaultValue="+234 801 234 5678" />
                        </div>
                        <Input label="Organisation" defaultValue="Africa Data Solutions" />
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" size="sm">Cancel</Button>
                            <Button size="sm">Save Changes</Button>
                        </div>
                    </GlassCard>
                </div>
            )}

            {/* Security */}
            {activeTab === 'Security' && (
                <div className="space-y-5 animate-fade-in">
                    <GlassCard className="space-y-5">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Lock className="w-4.5 h-4.5 text-primary" />
                            </div>
                            <h3 className="text-base font-bold font-heading">Change Password</h3>
                        </div>
                        <Input label="Current Password" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                            rightIcon={
                                <button onClick={() => setShowPass(s => !s)} className="text-text-secondary hover:text-primary">
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            }
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="New Password" type="password" placeholder="••••••••" />
                            <Input label="Confirm Password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="flex justify-end">
                            <Button size="sm" className="gap-2">
                                <Shield className="w-4 h-4" /> Update Password
                            </Button>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                                <Shield className="w-4.5 h-4.5 text-success" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold font-heading">Two-Factor Authentication</h3>
                                <p className="text-xs text-text-secondary">Add extra security to your account</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-success/5 border border-success/20">
                            <div>
                                <p className="text-sm font-semibold text-text-primary">Authenticator App</p>
                                <p className="text-xs text-text-secondary mt-0.5">Google Authenticator or Authy</p>
                            </div>
                            <Badge variant="success">Enabled</Badge>
                        </div>
                    </GlassCard>
                </div>
            )}

            {/* Notifications */}
            {activeTab === 'Notifications' && (
                <GlassCard className="animate-fade-in space-y-1">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <Bell className="w-4.5 h-4.5 text-secondary" />
                        </div>
                        <h3 className="text-base font-bold font-heading">Notification Preferences</h3>
                    </div>
                    {[
                        { key: 'newUser', label: 'New User Registration', sub: 'When a new user registers on the platform' },
                        { key: 'txnFailed', label: 'Transaction Failed', sub: 'Receive alerts for every failed transaction' },
                        { key: 'txnSuccess', label: 'Transaction Successful', sub: 'Notify on every completed transaction' },
                        { key: 'lowBalance', label: 'Low Wallet Balance', sub: 'Alert when wallet balance falls below threshold' },
                        { key: 'weeklyRpt', label: 'Weekly Summary Report', sub: 'Receive weekly analytics digest every Monday' },
                        { key: 'systemAlert', label: 'System Alerts', sub: 'Critical platform alerts and downtime notifications' },
                    ].map(n => (
                        <div key={n.key} className="flex items-center justify-between py-4 border-b border-glass-border last:border-0">
                            <div>
                                <p className="text-sm font-semibold text-text-primary">{n.label}</p>
                                <p className="text-xs text-text-secondary mt-0.5">{n.sub}</p>
                            </div>
                            <button
                                onClick={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-200
                                    ${notifs[n.key as keyof typeof notifs] ? 'bg-primary' : 'bg-glass-border'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
                                    ${notifs[n.key as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end pt-4">
                        <Button size="sm">Save Preferences</Button>
                    </div>
                </GlassCard>
            )}

            {/* API Keys */}
            {activeTab === 'API Keys' && (
                <div className="space-y-5 animate-fade-in">
                    <GlassCard>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo/10 flex items-center justify-center">
                                    <Key className="w-4.5 h-4.5 text-indigo" />
                                </div>
                                <h3 className="text-base font-bold font-heading">API Keys</h3>
                            </div>
                            <Button size="sm" className="gap-2">
                                <Key className="w-4 h-4" /> Generate New Key
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {API_KEYS.map(k => (
                                <div key={k.name} className="p-4 rounded-xl border border-glass-border hover:border-primary/20 transition-colors">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div>
                                            <p className="font-semibold text-text-primary">{k.name}</p>
                                            <div className="flex items-center gap-3 mt-0.5 text-xs text-text-secondary">
                                                <span>Created {new Date(k.created).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                <span>•</span>
                                                <span>Last used {new Date(k.last).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        <Badge variant={k.status === 'active' ? 'success' : 'error'}>{k.status}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-glass-border/40 font-mono text-xs text-text-secondary">
                                        <span className="flex-1 truncate">{k.key.slice(0, 32)}…</span>
                                        <button
                                            onClick={() => copyKey(k.key)}
                                            className="ml-auto shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                                        >
                                            {copied === k.key ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Button size="sm" variant="outline">Regenerate</Button>
                                        <Button size="sm" variant="ghost" className="text-error hover:bg-error/8">Revoke</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}
        </div>
    );
}
