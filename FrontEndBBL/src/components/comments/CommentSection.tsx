// src/components/comments/CommentSection.tsx
import React, { useState } from "react";
import { Comment as CommentType } from '../../types/comment.types';

type Props = {
    comments: CommentType[];
    loading: boolean;
    onAddComment: (content: string, author?: string) => Promise<void>;
};

export const CommentSection: React.FC<Props> = ({ comments, loading, onAddComment }) => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        await onAddComment(content.trim(), author.trim() || undefined);
        setContent("");
        setAuthor("");
    };

    return (
        <section className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Commentaires</h3>

            <form onSubmit={submit} className="flex flex-col gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Votre nom (optionnel)"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input"
                />
                <textarea
                    placeholder="Écrire un commentaire..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea"
                    rows={3}
                />
                <div>
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        Ajouter un commentaire
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {loading ? (
                    <p>Chargement des commentaires...</p>
                ) : comments.length === 0 ? (
                    <p className="text-gray-500">Aucun commentaire pour le moment.</p>
                ) : (
                    comments.map((c) => (
                        <div key={c.id} className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-semibold">{c.author || "Anonyme"}</div>
                                <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                            </div>
                            <div className="text-gray-700">{c.content}</div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
