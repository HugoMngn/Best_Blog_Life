/**
 * Composant d'affichage d'erreur
 */
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm max-w-md mx-auto">
            <div className="flex items-start">
                <AlertCircle className="text-red-600 mt-1 mr-4 flex-shrink-0" size={22} />
                <div className="flex-1">
                    <p className="text-red-800 text-sm sm:text-base font-medium">{message}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-3 text-sm sm:text-base text-red-600 hover:text-red-800 font-semibold transition-colors"
                        >
                            Réessayer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
