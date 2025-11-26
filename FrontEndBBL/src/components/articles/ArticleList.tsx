/**
 * Composant liste d'articles
 */
import React from 'react';
import { Article } from '../../types/article.types';
import { ArticleCard } from './ArticleCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

interface ArticleListProps {
    articles: Article[];
    loading: boolean;
    error: string | null;
    onLike: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit?: (article: Article) => void;
    onView?: (article: Article) => void;
    onRetry?: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
    articles,
    loading,
    error,
    onLike,
    onDelete,
    onEdit,
    onView,
    onRetry,
}) => {
    if (loading) {
        return <LoadingSpinner message="Chargement des articles..." />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Aucun article trouvé</p>
                <p className="text-gray-400 text-sm mt-2">
                    Créez votre premier article pour commencer !
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={onLike}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onView={onView}
                />
            ))}
        </div>
    );
};