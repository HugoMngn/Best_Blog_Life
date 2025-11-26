/**
 * Types TypeScript pour les articles
 * Définit les interfaces pour une gestion type-safe des articles
 */

export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    likesCount: number;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateArticleDto {
    title: string;
    content: string;
    author: string;
}

export interface UpdateArticleDto {
    title?: string;
    content?: string;
}

export interface ArticleFilters {
    search?: string;
    author?: string;
    sortBy?: 'createdAt' | 'likesCount';
    order?: 'asc' | 'desc';
}
