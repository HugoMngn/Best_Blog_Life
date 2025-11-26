/**
 * Composant carte d'article
 * Affiche un article sous forme de carte avec actions
 */
import React from 'react';
import { Heart, Trash2, Edit, Eye } from 'lucide-react';
import { Article } from '../../types/article.types';
import { formatRelativeTime } from '../../utils/dateFormatter';

interface ArticleCardProps {
    article: Article;
    onLike: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit?: (article: Article) => void;
    onView?: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
    article,
    onLike,
    onDelete,
    onEdit,
    onView,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="font-medium">Par {article.author}</span>
                    <span>{formatRelativeTime(article.createdAt)}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                        onClick={() => onLike(article.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                        <Heart size={20} className={article.likesCount > 0 ? 'fill-current' : ''} />
                        <span className="font-medium">{article.likesCount}</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {onView && (
                            <button
                                onClick={() => onView(article)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Voir l'article"
                            >
                                <Eye size={20} />
                            </button>
                        )}

                        {onEdit && (
                            <button
                                onClick={() => onEdit(article)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Modifier"
                            >
                                <Edit size={20} />
                            </button>
                        )}

                        <button
                            onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                                    onDelete(article.id);
                                }
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};