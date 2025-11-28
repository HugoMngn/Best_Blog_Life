/**
 * Service pour la gestion des commentaires
 */
import api from './api';
import { Comment, CreateCommentDto } from '../types/comment.types';

class CommentService {
    private readonly BASE_PATH = '/comments';

    /**
     * Récupère tous les commentaires d'un article
     * Appelle : GET /api/comments?article_id=1
     */
    async getCommentsByArticle(articleId: number): Promise<Comment[]> {
        try {
            const response = await api.get(this.BASE_PATH, {
                params: { article_id: articleId },
            });

            const data = response.data as any[];

            // Map server (snake_case) to frontend camelCase types
            return data.map(
                (c) =>
                ({
                    id: c.id,
                    articleId: c.article_id,
                    author: c.author ?? '',
                    content: c.content,
                    likesCount: c.likes_count ?? 0,
                    createdAt: c.created_at,
                } as Comment),
            );
        } catch (error) {
            console.error('getCommentsByArticle error', error);
            throw new Error('Erreur lors de la récupération des commentaires');
        }
    }

    /**
     * Crée un nouveau commentaire
     * Appelle : POST /api/comments
     * Body attendu (côté backend) : { article_id, author, content }
     */
    async createComment(comment: CreateCommentDto): Promise<Comment> {
        try {
            const payload = {
                article_id: comment.articleId,
                author: comment.author,
                content: comment.content,
            };

            const response = await api.post(this.BASE_PATH, payload);
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
            console.error('createComment error', error);
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
            console.error('deleteComment error', error);
            throw new Error('Erreur lors de la suppression du commentaire');
        }
    }

    /**
     * Ajoute un like à un commentaire (non implenté côté backend pour l'instant)
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
            console.error('likeComment error', error);
            throw new Error("Erreur lors de l'ajout du like");
        }
    }
}

export default new CommentService();
