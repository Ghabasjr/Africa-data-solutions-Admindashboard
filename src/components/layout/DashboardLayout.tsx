import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Outlet } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background bg-grid">
            {/* Mobile Sidebar Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300",
                    sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <Sidebar
                className={cn(
                    "lg:translate-x-0 transition-transform duration-300",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            />

            {/* Main Content — offset matches sidebar width (w-64 = 256px) */}
            <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-3 border-t border-glass-border text-xs text-text-secondary/60 flex items-center justify-between">
                    <span>© 2026 Africa Data Solutions. All rights reserved.</span>
                    <span>v1.0.0</span>
                </footer>
            </div>
        </div>
    );
}
