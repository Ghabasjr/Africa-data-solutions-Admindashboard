import { Outlet } from 'react-router-dom';

export function AuthLayout() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-fade-in mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/15 rounded-full blur-[120px] animate-fade-in mix-blend-multiply transition-all duration-1000" />
            </div>

            <div className="z-10 w-full max-w-md p-6 animate-fade-in">
                <Outlet />
            </div>
        </div>
    );
}
