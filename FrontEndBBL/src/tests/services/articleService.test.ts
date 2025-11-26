/**
 * Tests pour le service d'articles
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import articleService from '../../services/articleService';
import api from '../../services/api';

// Mock du module API
vi.mock('../../services/api');

describe('ArticleService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllArticles', () => {
        it('devrait récupérer tous les articles', async () => {
            const mockArticles = [
                { id: 1, title: 'Article 1', content: 'Content 1', author: 'Author 1' },
                { id: 2, title: 'Article 2', content: 'Content 2', author: 'Author 2' },
            ];

            vi.mocked(api.get).mockResolvedValue({ data: mockArticles });

            const articles = await articleService.getAllArticles();

            expect(api.get).toHaveBeenCalledWith('/articles', { params: {} });
            expect(articles).toEqual(mockArticles);
        });

        it('devrait inclure le paramètre de recherche', async () => {
            vi.mocked(api.get).mockResolvedValue({ data: [] });

            await articleService.getAllArticles('test');

            expect(api.get).toHaveBeenCalledWith('/articles', {
                params: { search: 'test' },
            });
        });

        it('devrait gérer les erreurs', async () => {
            vi.mocked(api.get).mockRejectedValue(new Error('Network error'));

            await expect(articleService.getAllArticles()).rejects.toThrow(
                'Erreur lors de la récupération des articles'
            );
        });
    });

    describe('createArticle', () => {
        it('devrait créer un nouvel article', async () => {
            const newArticle = {
                title: 'New Article',
                content: 'New Content',
                author: 'New Author',
            };

            const createdArticle = { id: 1, ...newArticle, likesCount: 0 };

            vi.mocked(api.post).mockResolvedValue({ data: createdArticle });

            const result = await articleService.createArticle(newArticle);

            expect(api.post).toHaveBeenCalledWith('/articles', newArticle);
            expect(result).toEqual(createdArticle);
        });
    });

    describe('deleteArticle', () => {
        it('devrait supprimer un article', async () => {
            vi.mocked(api.delete).mockResolvedValue({});

            await articleService.deleteArticle(1);

            expect(api.delete).toHaveBeenCalledWith('/articles/1');
        });
    });

    describe('likeArticle', () => {
        it('devrait liker un article', async () => {
            const likedArticle = {
                id: 1,
                title: 'Article',
                content: 'Content',
                author: 'Author',
                likesCount: 6,
            };

            vi.mocked(api.post).mockResolvedValue({ data: likedArticle });

            const result = await articleService.likeArticle(1);

            expect(api.post).toHaveBeenCalledWith('/articles/1/like');
            expect(result.likesCount).toBe(6);
        });
    });
});