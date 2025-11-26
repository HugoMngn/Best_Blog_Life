/**
 * Composant de chargement
 */
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 40,
    message = 'Chargement...',
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full shadow-lg mb-4 animate-pulse">
                <Loader2 size={size} className="animate-spin text-blue-600" />
            </div>
            <p className="text-gray-600 text-lg font-medium">{message}</p>
        </div>
    );
};
