import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-white hover:bg-tint shadow-lg hover:shadow-xl border border-transparent',
            secondary: 'bg-secondary text-white hover:bg-orange-600 shadow-md hover:shadow-lg border border-transparent',
            outline: 'bg-transparent border border-glass-border text-text-primary hover:bg-glass-bg',
            ghost: 'bg-transparent text-text-secondary hover:text-primary hover:bg-gray-100/10',
            danger: 'bg-error text-white hover:bg-red-600 shadow-md',
        };

        const sizes = {
            sm: 'h-8 px-3 text-sm rounded-lg',
            md: 'h-10 px-4 text-sm rounded-xl',
            lg: 'h-12 px-6 text-base rounded-2xl',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
