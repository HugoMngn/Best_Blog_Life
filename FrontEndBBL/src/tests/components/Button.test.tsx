/**
 * Tests pour le composant Button
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/common/Button';

describe('Button Component', () => {
    it('devrait afficher le texte du bouton', () => {
        render(<Button>Cliquez-moi</Button>);
        expect(screen.getByText('Cliquez-moi')).toBeInTheDocument();
    });

    it('devrait appeler onClick quand cliqué', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Cliquez</Button>);

        fireEvent.click(screen.getByText('Cliquez'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('devrait appliquer la variante primary par défaut', () => {
        render(<Button>Bouton</Button>);
        const button = screen.getByText('Bouton');
        expect(button.className).toContain('bg-blue-600');
    });

    it('devrait appliquer la variante danger', () => {
        render(<Button variant="danger">Supprimer</Button>);
        const button = screen.getByText('Supprimer');
        expect(button.className).toContain('bg-red-600');
    });

    it('devrait être désactivé quand disabled est true', () => {
        render(<Button disabled>Désactivé</Button>);
        const button = screen.getByText('Désactivé');
        expect(button).toBeDisabled();
    });
});