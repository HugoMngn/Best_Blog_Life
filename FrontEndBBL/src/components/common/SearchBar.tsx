/**
 * Composant de barre de recherche
 */
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    onClear,
    placeholder = 'Rechercher...',
}) => {
    return (
        <div className="relative mx-auto w-fit">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    w-80 
                    pl-4 pr-14 py-3 
                    border border-gray-300 
                    rounded-full 
                    shadow-sm 
                    transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    placeholder-gray-400
                "
            />
            {/* Icône loupe (à droite) */}
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Search className="text-gray-400" size={20} />
            </div>

            {/* Bouton clear */}
            {value && onClear && (
                <button
                    onClick={onClear}
                    className="
                        absolute right-4 top-1/2 transform -translate-y-1/2 
                        text-gray-400 hover:text-gray-600 
                        transition-colors
                        flex items-center justify-center
                    "
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};
