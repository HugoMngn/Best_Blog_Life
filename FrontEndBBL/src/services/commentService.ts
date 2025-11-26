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
            const response = await api.get<Comment[]>(`${this.BASE_PATH}/article/${articleId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des commentaires');
        }
    }

    /**
     * Crée un nouveau commentaire
     */
    async createComment(comment: CreateCommentDto): Promise<Comment> {
        try {
            const response = await api.post<Comment>(this.BASE_PATH, comment);
            return response.data;
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
            const response = await api.post<Comment>(`${this.BASE_PATH}/${id}/like`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de l\'ajout du like');
        }
    }
}

export default new CommentService();
