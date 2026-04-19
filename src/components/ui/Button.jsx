import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = React.forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[var(--of-bg-brand)] text-white hover:bg-[var(--of-magenta-700)] focus:ring-[var(--of-ring)]',
        secondary: 'bg-[var(--of-bg-recessed)] text-[var(--of-fg-default)] hover:bg-[var(--of-bg-sunken)] focus:ring-[var(--of-ring)]',
        outlined: 'border border-[var(--of-border-line)] bg-transparent text-[var(--of-fg-default)] hover:bg-[var(--of-bg-recessed)] focus:ring-[var(--of-ring)]',
        ghost: 'bg-transparent text-[var(--of-fg-default)] hover:bg-[var(--of-bg-recessed)] focus:ring-[var(--of-ring)]',
        danger: 'bg-[var(--of-danger-500)] text-white hover:brightness-95 focus:ring-[var(--of-danger-500)]',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 text-base',
    };

    return (
        <button
            ref={ref}
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';
