/**
 * Composant Button réutilisable
 * Bouton stylisé avec différentes variantes
 */
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = `
        font-medium rounded-lg shadow-md transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200',
    };

    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-5 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
