/**
 * Tests pour le composant Input
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../components/common/Input';

describe('Input Component', () => {
    it('devrait afficher le label', () => {
        render(<Input label="Nom" />);
        expect(screen.getByText('Nom')).toBeInTheDocument();
    });

    it('devrait afficher le message d\'erreur', () => {
        render(<Input error="Champ requis" />);
        expect(screen.getByText('Champ requis')).toBeInTheDocument();
    });

    it('devrait appeler onChange quand la valeur change', () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('devrait appliquer la classe d\'erreur quand error est défini', () => {
        render(<Input error="Erreur" />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('border-red-500');
    });
});