import React from 'react';
import { Heart, MessageCircle, Eye, Calendar, TrendingUp } from 'lucide-react';
import { Article } from '../../types/article.types';
import { formatRelativeTime } from '../../utils/dateFormatter';

interface ArticleCardProps {
    article: Article;
    onLike: (id: number) => void;
    onView: (article: Article) => void;
}

/**
 * ArticleCard component
 * - Displays a compact view of an article with actions (like, view)
 * - Uses presentational UI and forwards events to parents via callbacks
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onLike, onView }) => {
    return (
        <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="p-6">
                {article.likesCount > 5 && (
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        <TrendingUp size={12} />
                        Populaire
                    </div>
                )}

                <div className="flex items-start justify-between mb-3">
                    <h2
                        onClick={() => onView(article)}
                        className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1"
                    >
                        {article.title}
                    </h2>
                </div>

                <p
                    onClick={() => onView(article)}
                    className="text-gray-600 mb-4 line-clamp-3 leading-relaxed"
                >
                    {article.content}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="font-medium text-gray-700">{article.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatRelativeTime(article.createdAt)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onLike(article.id);
                            }}
                            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group/like"
                            title="J'aime cet article"
                        >
                            <Heart
                                size={20}
                                className={`${article.likesCount > 0 ? 'fill-red-500 text-red-500' : ''} group-hover/like:scale-110 transition-transform`}
                            />
                            <span className="font-bold text-base">{article.likesCount}</span>
                        </button>

                        <button
                            onClick={() => onView(article)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                            title="Voir les commentaires"
                        >
                            <MessageCircle size={20} />
                            <span className="font-medium">{article.commentsCount || 0}</span>
                        </button>
                    </div>

                    <button
                        onClick={() => onView(article)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        <Eye size={18} />
                        <span>Lire</span>
                    </button>
                </div>
            </div>
        </article>
    );
};
