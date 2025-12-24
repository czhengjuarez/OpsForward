import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Surface = ({
    children,
    className,
    as: Component = 'div',
    elevation = 'sm', // 'none', 'sm', 'md', 'lg'
    ...props
}) => {
    const baseStyles = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg';

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
