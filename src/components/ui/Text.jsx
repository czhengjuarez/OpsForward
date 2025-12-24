import React from 'react';
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
        default: 'text-gray-900 dark:text-gray-100',
        secondary: 'text-gray-500 dark:text-gray-400',
        primary: 'text-primary-600 dark:text-primary-400',
        white: 'text-white',
        danger: 'text-red-600 dark:text-red-400',
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
