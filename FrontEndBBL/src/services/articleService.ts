/**
 * Service pour la gestion des articles
 * Encapsule toutes les opérations CRUD liées aux articles
 */
import api from './api';
import { Article, CreateArticleDto, UpdateArticleDto } from '../types/article.types';

class ArticleService {
    private readonly BASE_PATH = '/articles';

    /**
     * Récupère tous les articles avec recherche optionnelle
     */
    async getAllArticles(search?: string): Promise<Article[]> {
        try {
            const params = search ? { search } : {};
            const response = await api.get<Article[]>(this.BASE_PATH, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Erreur lors de la récupération des articles');
        }
    }

    /**
     * Récupère un article par son ID
     */
    async getArticleById(id: number): Promise<Article> {
        try {
            const response = await api.get<Article>(`${this.BASE_PATH}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Article introuvable');
        }
    }

    /**
     * Crée un nouvel article
     */
    async createArticle(article: CreateArticleDto): Promise<Article> {
        try {
            const response = await api.post<Article>(this.BASE_PATH, article);
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Erreur lors de la création de l\'article');
        }
    }

    /**
     * Met à jour un article existant
     */
    async updateArticle(id: number, article: UpdateArticleDto): Promise<Article> {
        try {
            const response = await api.put<Article>(`${this.BASE_PATH}/${id}`, article);
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Erreur lors de la mise à jour de l\'article');
        }
    }

    /**
     * Supprime un article
     */
    async deleteArticle(id: number): Promise<void> {
        try {
            await api.delete(`${this.BASE_PATH}/${id}`);
        } catch (error) {
            throw this.handleError(error, 'Erreur lors de la suppression de l\'article');
        }
    }

    /**
     * Ajoute un like à un article
     */
    async likeArticle(id: number): Promise<Article> {
        try {
            const response = await api.post<Article>(`${this.BASE_PATH}/${id}/like`);
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Erreur lors de l\'ajout du like');
        }
    }

    /**
     * Gestion centralisée des erreurs
     */
    private handleError(error: any, defaultMessage: string): Error {
        const message = error.response?.data?.detail || defaultMessage;
        return new Error(message);
    }
}

export default new ArticleService();