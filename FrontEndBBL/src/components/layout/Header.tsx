/**
 * Composant Header de l'application
 */
import React from 'react';
import { FileText, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
    onCreateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
    return (
        <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl relative overflow-hidden">
            {/* Effet de fond animé */}
            <div className="absolute inset-0 bg-black opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                }}></div>
            </div>

            <div className="container mx-auto px-4 py-6 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <FileText size={32} />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
                                Best Blog Life
                                <Sparkles size={24} className="text-yellow-300" />
                            </h1>
                            <p className="text-blue-100 text-sm md:text-base mt-1 text-center">
                                Partagez vos idées, inspirez le monde
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onCreateClick}
                        className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        <span className="hidden md:inline">Nouvel Article</span>
                        <span className="md:hidden">Nouveau</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
