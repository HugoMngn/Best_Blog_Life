/**
 * ArticleService: Thin wrapper around the HTTP API layer for articles.
 * Methods return promises with typed responses and map errors to meaningful messages.
 */
import api from './api';
import { Article, CreateArticleDto } from '../types/article.types';

class ArticleService {
    private readonly BASE_PATH = '/articles';

    async getAllArticles(search?: string): Promise<Article[]> {
        // Retrieve articles ; support optional `search` query param
        try {
            const params = search ? { search } : {};
            const response = await api.get<Article[]>(this.BASE_PATH, { params });
            return response.data;
        } catch (err) {
            console.error('getAllArticles error: ', err);
            throw new Error('Erreur lors de la récupération des articles');
        }
    }


    async getArticleById(id: number): Promise<Article> {
        // Get a single article by id
        try {
            const response = await api.get<Article>(`${this.BASE_PATH}/${id}`);
            return response.data;
        } catch (err) {
            console.error(`getArticleById error (${id}): `, err);
            throw new Error('Article introuvable');
        }
    }


    async createArticle(article: CreateArticleDto & { password: string }): Promise<Article> {
        // Create an article; the backend expects a `password` to protect articles
        try {
            const response = await api.post<Article>(this.BASE_PATH, article);
            return response.data;
        } catch (err) {
            console.error('createArticle error: ', err);
            throw new Error('Erreur lors de la création de l\'article');
        }
    }


    async updateArticle(
        id: number,
        article: CreateArticleDto,
        password: string
    ): Promise<Article> {
        // Update an article with a password-protected API
        try {
            const response = await api.put<Article>(
                `${this.BASE_PATH}/${id}`,
                {
                    title: article.title,
                    content: article.content,
                    password
                }
            );
            return response.data;
        } catch (err: any) {
            console.error(`updateArticle error (${id}): `, err);
            if (err.response?.status === 403) {
                throw new Error('Mot de passe incorrect');
            }
            throw new Error('Erreur lors de la mise à jour');
        }
    }

    async deleteArticle(id: number, password: string): Promise<void> {
        // Delete an article, requires a password for protection
        try {
            await api.delete(`${this.BASE_PATH}/${id}`, {
                data: { password }
            });
        } catch (err: any) {
            console.error(`deleteArticle error (${id}): `, err);
            if (err.response?.status === 403) {
                throw new Error('Mot de passe incorrect');
            }
            throw new Error('Erreur lors de la suppression');
        }
    }

    async likeArticle(id: number): Promise<Article> {
        // Increment the like count for an article
        try {
            const response = await api.post<Article>(`${this.BASE_PATH}/${id}/like`);
            return response.data;
        } catch (err) {
            console.error(`likeArticle error (${id}): `, err);
            throw new Error('Erreur lors de l\'ajout du like');
        }
    }
}

export default new ArticleService();