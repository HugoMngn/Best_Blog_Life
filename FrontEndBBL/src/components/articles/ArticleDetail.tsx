/**
 * ArticleDetail component
 * - Presentation and actions for a single article (view, like, edit, delete)
 * - Integrates the comment section and deletion modal
 */
import React, { useState, useEffect } from 'react';
import { Article } from '../../types/article.types';
import { formatDateTime } from '../../utils/dateFormatter';
import { Heart, Edit, Trash2, ArrowLeft, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from '../common/Button';
import { CommentSection } from '../comments/CommentSection';
import { useComments } from '../../hooks/useComments';
import { PasswordModal } from '../common/PasswordModal';

interface ArticleDetailProps {
    article: Article;
    onLike: (id: number) => void;
    onEdit: (article: Article) => void;
    onDelete: (id: number, password: string) => void;
    onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
    article,
    onLike,
    onEdit,
    onDelete,
    onBack,
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {
        comments,
        loading: commentsLoading,
        fetchComments,
        createComment
    } = useComments(article.id);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleDelete = async (password: string) => {
        await onDelete(article.id, password);
        setShowDeleteModal(false);
    };

    return (
        <div className="space-y-6">
            {/* En-tête avec bouton retour */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux articles
            </button>

            {/* Article principal */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {article.author.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-900">{article.author}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>{formatDateTime(article.createdAt)}</span>
                    </div>

                    <div className="prose prose-lg max-w-none mb-8">
                        <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed">
                            {article.content}
                        </p>
                    </div>

                    {/* Statistiques de l'article */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                            Statistiques
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Heart size={20} className="text-red-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{article.likesCount}</p>
                                    <p className="text-sm text-gray-600">J'aime</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MessageCircle size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
                                    <p className="text-sm text-gray-600">Commentaires</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <TrendingUp size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {article.likesCount + comments.length}
                                    </p>
                                    <p className="text-sm text-gray-600">Interactions</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-200 gap-4">
                        <button
                            onClick={() => onLike(article.id)}
                            className="flex items-center gap-3 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors group"
                        >
                            <Heart
                                size={24}
                                className={`${article.likesCount > 0
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400 group-hover:text-red-500'
                                    } group-hover:scale-110 transition-transform`}
                            />
                            <span className="text-lg font-semibold text-gray-700">
                                J'aime
                            </span>
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
                                onClick={() => setShowDeleteModal(true)}
                                className="flex items-center gap-2"
                            >
                                <Trash2 size={18} />
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Section commentaires */}
            <CommentSection
                comments={comments}
                loading={commentsLoading}
                onAddComment={createComment}
            />

            {/* Modal de confirmation de suppression */}
            <PasswordModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSubmit={handleDelete}
                title="Supprimer l'article"
                description="Entrez le mot de passe de cet article pour confirmer la suppression."
                submitLabel="Supprimer"
                submitVariant="danger"
            />
        </div>
    );
};
