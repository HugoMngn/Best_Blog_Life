/**
 * ArticleList component
 * - Displays a collection of articles with loading and empty states
 */
import React from 'react';
import { Article } from '../../types/article.types';
import { ArticleCard } from './ArticleCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { FileText } from 'lucide-react';

interface ArticleListProps {
    articles: Article[];
    loading: boolean;
    error: string | null;
    onLike: (id: number) => void;
    onView: (article: Article) => void;
    onRetry?: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
    articles,
    loading,
    error,
    onLike,
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
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
                    <FileText size={48} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Aucun article trouvé
                </h3>
                <p className="text-gray-500 text-lg mb-6">
                    Soyez le premier à partager votre histoire !
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {articles.map(article => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={onLike}
                    onView={onView}
                />
            ))}
        </div>
    );
};