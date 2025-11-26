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
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
            <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    {/* Logo et titre */}
                    <div className="flex items-center gap-4">
                        <FileText size={36} className="text-white" />
                        <div>
                            <h1 className="text-3xl font-extrabold drop-shadow-md">Best Blog Life</h1>
                            <p className="text-blue-200 text-sm mt-1">
                                Viens raconter ce que tu veux mdr !
                            </p>
                        </div>
                    </div>

                    {/* Bouton création */}
                    <Button
                        onClick={onCreateClick}
                        className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-md px-4 py-2 rounded-lg transition-all duration-200"
                    >
                        <Plus size={20} />
                        Nouvel Article
                    </Button>
                </div>
            </div>
        </header>
    );
};
