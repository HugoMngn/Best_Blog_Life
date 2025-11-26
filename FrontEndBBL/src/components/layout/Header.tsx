/**
 * Composant Header de l'application
 */
import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '../common/Button';

interface HeaderProps {
    onCreateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FileText size={32} />
                        <div>
                            <h1 className="text-3xl font-bold">Mon Blog</h1>
                            <p className="text-blue-100 text-sm">
                                Partagez vos idées avec le monde
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={onCreateClick}
                        className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50"
                    >
                        <Plus size={20} />
                        Nouvel Article
                    </Button>
                </div>
            </div>
        </header>
    );
};