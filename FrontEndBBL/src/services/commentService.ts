/**
 * Service pour la gestion des commentaires
 */
import api from './api';
import { Comment, CreateCommentDto } from '../types/comment.types';

class CommentService {
    private readonly BASE_PATH = '/comments';

    /**
     * Récupère tous les commentaires d'un article
     */
    async getCommentsByArticle(articleId: number): Promise<Comment[]> {
        try {
            const response = await api.get(`${this.BASE_PATH}/article/${articleId}`);
            const data = response.data as any[];
            // Map server (snake_case) to frontend camelCase types
            return data.map((c) => ({
                id: c.id,
                articleId: c.article_id,
                author: c.author ?? '',
                content: c.content,
                likesCount: c.likes_count ?? 0,
                createdAt: c.created_at,
            } as Comment));
        } catch (error) {
            throw new Error('Erreur lors de la récupération des commentaires');
        }
    }

    /**
     * Crée un nouveau commentaire
     */
    async createComment(comment: CreateCommentDto): Promise<Comment> {
        try {
            const response = await api.post(this.BASE_PATH, comment);
            const c = response.data;
            return {
                id: c.id,
                articleId: c.article_id,
                author: c.author ?? '',
                content: c.content,
                likesCount: c.likes_count ?? 0,
                createdAt: c.created_at,
            } as Comment;
        } catch (error) {
            throw new Error('Erreur lors de la création du commentaire');
        }
    }

    /**
     * Supprime un commentaire
     */
    async deleteComment(id: number): Promise<void> {
        try {
            await api.delete(`${this.BASE_PATH}/${id}`);
        } catch (error) {
            throw new Error('Erreur lors de la suppression du commentaire');
        }
    }

    /**
     * Ajoute un like à un commentaire
     */
    async likeComment(id: number): Promise<Comment> {
        try {
            const response = await api.post(`${this.BASE_PATH}/${id}/like`);
            const c = response.data;
            return {
                id: c.id,
                articleId: c.article_id,
                author: c.author ?? '',
                content: c.content,
                likesCount: c.likes_count ?? 0,
                createdAt: c.created_at,
            } as Comment;
        } catch (error) {
            throw new Error('Erreur lors de l\'ajout du like');
        }
    }
}

export default new CommentService();
