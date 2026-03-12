import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, Lock, ArrowRight, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Branding */}
            <div className="flex flex-col items-center text-center space-y-3 mb-2">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl primary-gradient flex items-center justify-center shadow-xl shadow-primary/30 mb-1">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full success-gradient flex items-center justify-center shadow-md">
                        <Shield className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold font-heading text-text-primary">
                        ADS Admin Portal
                    </h1>
                    <p className="text-text-secondary mt-1 text-sm">
                        Africa Data Solutions · Secure Admin Access
                    </p>
                </div>
            </div>

            <GlassCard className="w-full space-y-5 shadow-xl border-white/20">
                <p className="text-sm font-semibold text-text-secondary text-center">Sign in to your admin account</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="admin@africadatasolutions.ng"
                        leftIcon={<Mail className="w-4 h-4 text-text-secondary" />}
                        autoComplete="email"
                    />

                    <div className="space-y-1.5">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            leftIcon={<Lock className="w-4 h-4 text-text-secondary" />}
                            autoComplete="current-password"
                        />
                        <div className="flex justify-end">
                            <button type="button" className="text-xs font-medium text-primary hover:text-tint transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full relative group" size="lg">
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </form>
            </GlassCard>

            <div className="flex items-center gap-2 text-xs text-text-secondary/60">
                <Shield className="w-3 h-3" />
                <span>Protected by 256-bit SSL encryption</span>
            </div>

            <p className="text-xs text-text-secondary/50">
                © 2026 Africa Data Solutions. Secure Admin Portal.
            </p>
        </div>
    );
}
