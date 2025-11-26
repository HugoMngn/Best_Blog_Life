/**
 * Composant Input réutilisable
 * Champ de saisie avec gestion d'erreur
 */
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full max-w-md mx-auto">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full 
                    px-4 py-3 
                    border rounded-lg 
                    shadow-sm 
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    placeholder-gray-400
                    ${error ? 'border-red-500' : 'border-gray-300'}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};
