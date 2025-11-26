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
    size = 32,
    message = 'Chargement...',
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={size} className="animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">{message}</p>
        </div>
    );
};