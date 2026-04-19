import { twMerge } from 'tailwind-merge';

export const Surface = ({
    children,
    className,
    as: Component = 'div',
    elevation = 'sm', // 'none', 'sm', 'md', 'lg'
    ...props
}) => {
    const baseStyles = 'bg-[var(--of-bg-elevated)] border border-[var(--of-border-line)] rounded-lg';

    const elevations = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-md',
        xl: 'shadow-lg',
    };

    return (
        <Component
            className={twMerge(baseStyles, elevations[elevation], className)}
            {...props}
        >
            {children}
        </Component>
    );
};
