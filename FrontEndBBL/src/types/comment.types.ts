/**
 * Types TypeScript pour les commentaires
 */

export interface Comment {
    id: number;
    articleId: number;
    author: string;
    content: string;
    likesCount: number;
    createdAt: string;
}

export interface CreateCommentDto {
    articleId: number;
    author: string;
    content: string;
}
