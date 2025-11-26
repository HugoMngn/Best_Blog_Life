/**
 * Composant Footer de l'application
 */
import React from 'react';
import { Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">
                            © 2025 Best Blog Life. Tous droits réservés.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="mailto:contacteznous@bbl.com"
                            className="hover:text-blue-400 transition-colors"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
