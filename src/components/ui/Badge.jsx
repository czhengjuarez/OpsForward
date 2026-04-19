import { twMerge } from 'tailwind-merge';

export const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium';

    const variants = {
        default: 'bg-[var(--of-bg-recessed)] text-[var(--of-fg-default)]',
        primary: 'bg-[var(--of-bg-brand-tint)] text-[var(--of-fg-brand)]',
        info: 'bg-[var(--of-info-100)] text-[var(--of-info-500)]',
        success: 'bg-[var(--of-success-100)] text-[var(--of-success-500)]',
        warning: 'bg-[var(--of-warning-100)] text-[var(--of-warning-500)]',
        danger: 'bg-[var(--of-danger-100)] text-[var(--of-danger-500)]',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
    };

    return (
        <span
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </span>
    );
};
