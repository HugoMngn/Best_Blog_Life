/**
 * Hook personnalisé pour la gestion des articles
 * Encapsule la logique d'état et les opérations CRUD
 */
import { useState, useEffect, useCallback } from 'react';
import articleService from '../services/articleService';
import { Article, CreateArticleDto, UpdateArticleDto } from '../types/article.types';

interface UseArticlesReturn {
    articles: Article[];
    loading: boolean;
    error: string | null;
    fetchArticles: (search?: string) => Promise<void>;
    createArticle: (article: CreateArticleDto) => Promise<Article>;
    updateArticle: (id: number, article: UpdateArticleDto) => Promise<Article>;
    deleteArticle: (id: number) => Promise<void>;
    likeArticle: (id: number) => Promise<void>;
}

export const useArticles = (): UseArticlesReturn => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Récupère les articles avec recherche optionnelle
     */
    const fetchArticles = useCallback(async (search?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await articleService.getAllArticles(search);
            setArticles(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Crée un nouvel article
     */
    const createArticle = useCallback(async (article: CreateArticleDto): Promise<Article> => {
        try {
            const newArticle = await articleService.createArticle(article);
            setArticles(prev => [newArticle, ...prev]);
            return newArticle;
        } catch (err) {
            throw err;
        }
    }, []);

    /**
     * Met à jour un article
     */
    const updateArticle = useCallback(async (id: number, article: UpdateArticleDto): Promise<Article> => {
        try {
            const updatedArticle = await articleService.updateArticle(id, article);
            setArticles(prev =>
                prev.map(a => a.id === id ? updatedArticle : a)
            );
            return updatedArticle;
        } catch (err) {
            throw err;
        }
    }, []);

    /**
     * Supprime un article
     */
    const deleteArticle = useCallback(async (id: number): Promise<void> => {
        try {
            await articleService.deleteArticle(id);
            setArticles(prev => prev.filter(article => article.id !== id));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erreur lors de la suppression';
            setError(message);
            throw err;
        }
    }, []);

    /**
     * Ajoute un like à un article
     */
    const likeArticle = useCallback(async (id: number): Promise<void> => {
        try {
            const updatedArticle = await articleService.likeArticle(id);
            setArticles(prev =>
                prev.map(article => article.id === id ? updatedArticle : article)
            );
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erreur lors du like';
            setError(message);
        }
    }, []);

    // Charge les articles au montage du composant
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return {
        articles,
        loading,
        error,
        fetchArticles,
        createArticle,
        updateArticle,
        deleteArticle,
        likeArticle,
    };
};
