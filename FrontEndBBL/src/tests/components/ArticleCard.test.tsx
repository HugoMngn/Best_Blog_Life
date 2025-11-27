import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleCard } from '../../components/articles/ArticleCard';
import { Article } from '../../types/article.types';

describe('ArticleCard Component', () => {
    const mockArticle: Article = {
        id: 1,
        title: 'Test Article',
        content: 'Ceci est un contenu de test pour l\'article',
        author: 'John Doe',
        likesCount: 5,
        commentsCount: 3,
        createdAt: '2024-01-15T10:00:00Z',
    };

    it('devrait afficher le titre de l\'article', () => {
        render(<ArticleCard article={mockArticle} onLike={() => { }} onView={() => { }} />);
        expect(screen.getByText('Test Article')).toBeInTheDocument();
    });

    it('devrait afficher l\'auteur', () => {
        render(<ArticleCard article={mockArticle} onLike={() => { }} onView={() => { }} />);
        expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    });

    it('devrait afficher le nombre de likes', () => {
        render(<ArticleCard article={mockArticle} onLike={() => { }} onView={() => { }} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('devrait appeler onLike quand le bouton like est cliqué', () => {
        const handleLike = vi.fn();
        render(<ArticleCard article={mockArticle} onLike={handleLike} onView={() => { }} />);

        const likeButton = screen.getAllByRole('button')[0];
        fireEvent.click(likeButton);

        expect(handleLike).toHaveBeenCalledWith(1);
    });
});
