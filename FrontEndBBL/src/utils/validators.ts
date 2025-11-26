/**
 * Fonctions de validation pour les formulaires
 */

export const validateArticleTitle = (title: string): string | null => {
    if (!title.trim()) {
        return 'Le titre est requis';
    }
    if (title.length < 3) {
        return 'Le titre doit contenir au moins 3 caractères';
    }
    if (title.length > 200) {
        return 'Le titre ne peut pas dépasser 200 caractères';
    }
    return null;
};

export const validateArticleContent = (content: string): string | null => {
    if (!content.trim()) {
        return 'Le contenu est requis';
    }
    if (content.length < 10) {
        return 'Le contenu doit contenir au moins 10 caractères';
    }
    return null;
};

export const validateAuthor = (author: string): string | null => {
    if (!author.trim()) {
        return 'Le nom de l\'auteur est requis';
    }
    if (author.length < 2) {
        return 'Le nom doit contenir au moins 2 caractères';
    }
    if (author.length > 100) {
        return 'Le nom ne peut pas dépasser 100 caractères';
    }
    return null;
};