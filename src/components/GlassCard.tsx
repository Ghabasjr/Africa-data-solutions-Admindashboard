import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    gradient?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, gradient, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'glass-card p-6 transition-all duration-300',
                    gradient && 'primary-gradient text-white border-none',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
