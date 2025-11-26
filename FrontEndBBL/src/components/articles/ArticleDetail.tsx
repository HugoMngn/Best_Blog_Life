/**
 * Composant de détail d'un article
 */
import React from 'react';
import { Article } from '../../types/article.types';
import { formatDateTime } from '../../utils/dateFormatter';
import { Heart, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';

interface ArticleDetailProps {
    article: Article;
    onLike: (id: number) => void;
    onEdit: (article: Article) => void;
    onDelete: (id: number) => void;
    onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
    article,
    onLike,
    onEdit,
    onDelete,
    onBack,
}) => {
    const handleDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            onDelete(article.id);
            onBack();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
                >
                    <ArrowLeft size={20} />
                    Retour
                </button>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {article.title}
                </h1>

                <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
                    <span className="font-medium">Par {article.author}</span>
                    <span>•</span>
                    <span>{formatDateTime(article.createdAt)}</span>
                </div>

                <div className="prose max-w-none mb-8">
                    <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed">
                        {article.content}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                    <button
                        onClick={() => onLike(article.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                        <Heart
                            size={24}
                            className={article.likesCount > 0 ? 'fill-current' : ''}
                        />
                        <span className="text-lg font-medium">{article.likesCount} J'aime</span>
                    </button>

                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => onEdit(article)}
                            className="flex items-center gap-2"
                        >
                            <Edit size={18} />
                            Modifier
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            className="flex items-center gap-2"
                        >
                            <Trash2 size={18} />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
