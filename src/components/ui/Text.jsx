import { twMerge } from 'tailwind-merge';

export const Text = ({
    children,
    as: Component = 'p',
    size = 'base',
    weight = 'normal',
    color = 'default',
    className,
    ...props
}) => {
    const sizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
    };

    const weights = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const colors = {
        default: 'text-[var(--of-fg-default)]',
        secondary: 'text-[var(--of-fg-muted)]',
        primary: 'text-[var(--of-fg-brand)]',
        white: 'text-white',
        danger: 'text-[var(--of-danger-500)]',
    };

    return (
        <Component
            className={twMerge(sizes[size], weights[weight], colors[color], className)}
            {...props}
        >
            {children}
        </Component>
    );
};
