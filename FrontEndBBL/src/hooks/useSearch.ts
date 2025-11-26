/**
 * Hook pour la gestion de la recherche avec debounce
 */
import { useState, useEffect, useCallback } from 'react';

interface UseSearchReturn {
    searchQuery: string;
    debouncedQuery: string;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
}

export const useSearch = (delay: number = 500): UseSearchReturn => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, delay);

        return () => clearTimeout(timer);
    }, [searchQuery, delay]);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        setDebouncedQuery('');
    }, []);

    return {
        searchQuery,
        debouncedQuery,
        setSearchQuery,
        clearSearch,
    };
};