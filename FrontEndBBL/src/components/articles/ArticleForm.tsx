/**
 * Composant formulaire de création/modification d'article
 */
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

interface ArticleFormProps {
    article?: Article;
    onSubmit: (article: CreateArticleDto) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Réinitialise le formulaire si l'article change
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
     * Valide le formulaire complet
     */
    const validateForm = (): boolean => {
        const titleError = validateArticleTitle(formData.title);
        const contentError = validateArticleContent(formData.content);
        const authorError = validateAuthor(formData.author);

        setErrors({
            title: titleError,
            content: contentError,
            author: authorError,
        });

        return !titleError && !contentError && !authorError;
    };

    /**
     * Gère la soumission du formulaire
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            // Réinitialise le formulaire après succès
            if (!isEditing) {
                setFormData({ title: '', content: '', author: '' });
            }
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Met à jour un champ du formulaire
     */
    const handleChange = (field: keyof CreateArticleDto, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Efface l'erreur du champ modifié
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex gap-4 justify-end">
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
                    {isSubmitting
                        ? 'En cours...'
                        : isEditing
                            ? 'Mettre à jour'
                            : 'Publier'}
                </Button>
            </div>
        </form>
    );
};
