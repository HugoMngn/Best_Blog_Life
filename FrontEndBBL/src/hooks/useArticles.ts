/**
 * useArticles: custom React hook that encapsulates article-related state
 * and side-effects: fetching, creating, updating, deleting, and liking
 * articles via the `articleService` API wrapper.
 */
import { useState, useEffect, useCallback } from 'react';
import articleService from '../services/articleService';
import { Article, CreateArticleDto } from '../types/article.types';

interface UseArticlesReturn {
    articles: Article[];
    loading: boolean;
    error: string | null;
    fetchArticles: (search?: string) => Promise<void>;
    createArticle: (article: CreateArticleDto & { password: string }) => Promise<Article>;
    updateArticle: (id: number, article: CreateArticleDto, password: string) => Promise<Article>;
    deleteArticle: (id: number, password: string) => Promise<void>;
    likeArticle: (id: number) => Promise<void>;
}

export const useArticles = (): UseArticlesReturn => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction utilitaire pour mapper snake_case → camelCase
    const mapArticle = (a: any): Article => ({
        id: a.id,
        title: a.title,
        content: a.content,
        author: a.author,
        likesCount: a.likes_count ?? 0,
        commentsCount: a.comments?.length ?? a.comments_count ?? 0,
        createdAt: a.created_at,
        updatedAt: a.updated_at,
    });

    const fetchArticles = useCallback(async (search?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await articleService.getAllArticles(search);
            const mapped = data.map(mapArticle);
            setArticles(mapped);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createArticle = useCallback(async (article: CreateArticleDto & { password: string }): Promise<Article> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const newArticle = await articleService.createArticle(article);
            setArticles(prev => [mapArticle(newArticle), ...prev]);
            return mapArticle(newArticle);
        } catch (err) {
            throw err;
        }
    }, []);

    const updateArticle = useCallback(async (id: number, article: CreateArticleDto, password: string): Promise<Article> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const updatedArticle = await articleService.updateArticle(id, article, password);
            const mapped = mapArticle(updatedArticle);
            setArticles(prev => prev.map(a => a.id === id ? mapped : a));
            return mapped;
        } catch (err) {
            throw err;
        }
    }, []);

    const deleteArticle = useCallback(async (id: number, password: string): Promise<void> => {
        // eslint-disable-next-line no-useless-catch
        try {
            await articleService.deleteArticle(id, password);
            setArticles(prev => prev.filter(article => article.id !== id));
        } catch (err) {
            throw err;
        }
    }, []);

    const likeArticle = useCallback(async (id: number): Promise<void> => {
        try {
            const updatedArticle = await articleService.likeArticle(id);
            const mapped = mapArticle(updatedArticle);
            setArticles(prev => prev.map(article => article.id === id ? mapped : article));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erreur lors du like';
            setError(message);
        }
    }, []);

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
