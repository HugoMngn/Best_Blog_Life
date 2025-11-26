/**
 * Composant TextArea réutilisable
 */
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string | null;
}

export const TextArea: React.FC<TextAreaProps> = ({
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
            <textarea
                className={`
                    w-full 
                    px-4 py-3 
                    border rounded-lg 
                    shadow-sm 
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    resize-none
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
