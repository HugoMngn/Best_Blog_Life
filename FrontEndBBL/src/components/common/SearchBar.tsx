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
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            {value && onClear && (
                <button
                    onClick={onClear}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};