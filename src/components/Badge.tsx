import { cn } from '../lib/utils';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'purple' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-success/10 text-success border border-success/20',
    error:   'bg-error/10 text-error border border-error/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    info:    'bg-primary/10 text-primary border border-primary/20',
    purple:  'bg-purple/10 text-purple border border-purple/20',
    default: 'bg-text-secondary/10 text-text-secondary border border-text-secondary/15',
};

const dots: Record<BadgeVariant, string> = {
    success: 'bg-success',
    error:   'bg-error',
    warning: 'bg-warning',
    info:    'bg-primary',
    purple:  'bg-purple',
    default: 'bg-text-secondary',
};

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    dot?: boolean;
    className?: string;
}

export function Badge({ variant = 'default', children, dot = true, className }: BadgeProps) {
    return (
        <span className={cn('badge', variantStyles[variant], className)}>
            {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dots[variant])} />}
            {children}
        </span>
    );
}
