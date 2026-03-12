import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cn } from '../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label htmlFor={id} className="text-sm font-medium text-text-secondary">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={id}
                        className={cn(
                            'w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            error && 'border-error focus:border-error focus:ring-error',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="text-xs text-error">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
