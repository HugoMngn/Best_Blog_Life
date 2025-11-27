/**
 * CreateArticleModal
 * - Wrapper modal that shows an ArticleForm and a password field
 * - Requires password to create an article (used for edit/delete protection)
 */
import { useState } from 'react';
import { Modal } from '../common/Modal';
import { ArticleForm } from './ArticleForm';
import { CreateArticleDto } from '../../types/article.types';

interface CreateArticleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateArticleDto & { password: string }) => Promise<void>;
}

export const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (article: CreateArticleDto) => {
        if (!password) {
            alert('Veuillez renseigner un mot de passe.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({ ...article, password });
            setPassword('');
            onClose();
        } catch (err) {
            console.error('create article error: ', err);
            alert('Erreur lors de la création de l’article.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Créer un nouvel article">
            <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm text-blue-800 font-medium">Protégez votre article</p>
                    <p className="text-xs text-blue-700 mt-1">
                        Définissez un mot de passe pour pouvoir modifier ou supprimer cet article plus tard.
                    </p>
                </div>

                <ArticleForm
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isEditing={false}
                />

                <input
                    type="password"
                    placeholder="Mot de passe de l'article *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    disabled={isSubmitting}
                />
            </div>
        </Modal>
    );
};
