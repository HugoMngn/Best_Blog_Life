// src/components/common/PasswordModal.tsx
import React, { useState, useEffect } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (password: string) => void | Promise<void>;
    title?: string;
    description?: string;
    submitLabel?: string;
    submitVariant?: "danger" | "primary" | "secondary";
};

export const PasswordModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Mot de passe",
    description,
    submitLabel = "Valider",
    submitVariant = "primary",
}) => {
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        if (!isOpen) setPwd("");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
                <input
                    type="password"
                    placeholder="Entrez le mot de passe"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full input mb-4"
                />
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="btn">
                        Annuler
                    </button>
                    <button
                        onClick={() => onSubmit(pwd)}
                        className={`btn btn-${submitVariant || "primary"}`}
                    >
                        {submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
