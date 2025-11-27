/**
 * EditArticleModal
 * - Wraps `ArticleForm` to edit an existing article
 * - Uses a password to authorize the update
 */
import { useState } from 'react';
import { Modal } from '../common/Modal';
import { ArticleForm } from './ArticleForm';
import { Article, CreateArticleDto } from '../../types/article.types';

interface EditArticleModalProps {
    isOpen: boolean;
    article: Article | null;
    onClose: () => void;
    onSubmit: (data: CreateArticleDto, password: string) => Promise<void>;
}

export const EditArticleModal: React.FC<EditArticleModalProps> = ({ isOpen, article, onClose, onSubmit }) => {
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: CreateArticleDto) => {
        if (!password) {
            alert('Veuillez renseigner le mot de passe.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(data, password);
            setPassword('');
            onClose();
        } catch (err) {
            console.error('update article error: ', err);
            alert('Mot de passe incorrect');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!article) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Modifier l'article">
            <div className="space-y-6">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                    <p className="text-sm text-amber-800 font-medium">Mot de passe requis</p>
                    <p className="text-xs text-amber-700 mt-1">
                        Entrez le mot de passe que vous avez défini lors de la création de cet article.
                    </p>
                </div>

                <ArticleForm
                    article={article}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isEditing
                />

                <input
                    type="password"
                    placeholder="Mot de passe de l'article *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    disabled={isSubmitting}
                />
            </div>
        </Modal>
    );
};
