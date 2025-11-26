/**
 * Composant Footer de l'application
 */
import React from 'react';
import { Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white mt-12 shadow-inner">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <p className="text-sm text-gray-400">
                            © 2025 Best Blog Life. Tous droits réservés.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                        >
                            <Github size={22} />
                        </a>
                        <a
                            href="mailto:contacteznous@bbl.com"
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                        >
                            <Mail size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
