/**
 * Tests pour le composant SearchBar
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../../components/common/SearchBar';

describe('SearchBar Component', () => {
    it('devrait afficher le placeholder', () => {
        render(
            <SearchBar
                value=""
                onChange={() => { }}
                placeholder="Rechercher..."
            />
        );
        expect(screen.getByPlaceholderText('Rechercher...')).toBeInTheDocument();
    });

    it('devrait appeler onChange quand le texte change', () => {
        const handleChange = vi.fn();
        render(<SearchBar value="" onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('devrait afficher le bouton clear quand value est défini', () => {
        const handleClear = vi.fn();
        render(
            <SearchBar
                value="test"
                onChange={() => { }}
                onClear={handleClear}
            />
        );

        const clearButton = screen.getByRole('button');
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);
        expect(handleClear).toHaveBeenCalled();
    });
});