import React, { useState, useEffect } from 'react';
import { Article, CreateArticleDto } from '../../types/article.types';
import { Input } from '../common/Input';
import { TextArea } from '../common/TextArea';
import { Button } from '../common/Button';
import {
    validateArticleTitle,
    validateArticleContent,
    validateAuthor,
} from '../../utils/validators';

/**
 * ArticleForm component
 * - Used for creating or editing an article
 * - Includes local form state, simple validation and submit handling
 */
interface ArticleFormProps {
    article?: Article;
    onSubmit: (article: CreateArticleDto) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

/**
 * ArticleForm: React functional component
 *
 * Props:
 * - article: optional Article to prefill the form (edit mode)
 * - onSubmit: callback to handle create/update actions, returns a promise
 * - onCancel: callback to close the form without saving
 * - isEditing: boolean flag to indicate edit mode (disables author input)
 */
export const ArticleForm: React.FC<ArticleFormProps> = ({
    article,
    onSubmit,
    onCancel,
    isEditing = false,
}) => {
    const [formData, setFormData] = useState<CreateArticleDto>({
        title: article?.title || '',
        content: article?.content || '',
        author: article?.author || '',
    });

    const [errors, setErrors] = useState<{
        title?: string | null;
        content?: string | null;
        author?: string | null;
    }>({});

    // Local UI state to prevent duplicate submissions
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (article) {
            setFormData({
                title: article.title,
                content: article.content,
                author: article.author,
            });
        }
    }, [article]);

    /**
     * validateForm : perform field validations and set error messages
     * Returns true if the form is valid, false otherwise
     */
    const validateForm = (): boolean => {
        const titleError = validateArticleTitle(formData.title);
        const contentError = validateArticleContent(formData.content);
        const authorError = validateAuthor(formData.author);

        setErrors({ title: titleError, content: contentError, author: authorError });
        return !titleError && !contentError && !authorError;
    };

    /**
     * handleSubmit : prevent default submit, validate the form and call onSubmit
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            if (!isEditing) {
                setFormData({ title: '', content: '', author: '' });
            }
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * handleChange : update the local form state and clear relevant error
     */
    const handleChange = (field: keyof CreateArticleDto, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                space-y-6
                w-full
                max-w-xl
                mx-auto
            "
        >
            <Input
                label="Titre de l'article *"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
                placeholder="Entrez le titre de votre article"
                disabled={isSubmitting}
            />

            <Input
                label="Auteur *"
                type="text"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                error={errors.author}
                placeholder="Votre nom"
                disabled={isSubmitting || isEditing}
            />

            <TextArea
                label="Contenu *"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                error={errors.content}
                placeholder="Écrivez le contenu de votre article..."
                rows={10}
                disabled={isSubmitting}
            />

            <div className="flex justify-end gap-4 pt-2 border-t border-gray-100 mt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'En cours...' : isEditing ? 'Mettre à jour' : 'Publier'}
                </Button>
            </div>
        </form>
    );
};
