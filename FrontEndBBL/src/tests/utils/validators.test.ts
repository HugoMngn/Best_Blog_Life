/**
 * Tests unitaires pour les validateurs
 */
import { describe, it, expect } from 'vitest';
import {
    validateArticleTitle,
    validateArticleContent,
    validateAuthor,
} from '../../utils/validators';

describe('Validators', () => {
    describe('validateArticleTitle', () => {
        it('devrait retourner null pour un titre valide', () => {
            expect(validateArticleTitle('Mon super article')).toBeNull();
        });

        it('devrait retourner une erreur pour un titre vide', () => {
            expect(validateArticleTitle('')).toBe('Le titre est requis');
            expect(validateArticleTitle('   ')).toBe('Le titre est requis');
        });

        it('devrait retourner une erreur pour un titre trop court', () => {
            expect(validateArticleTitle('ab')).toBe(
                'Le titre doit contenir au moins 3 caractères'
            );
        });

        it('devrait retourner une erreur pour un titre trop long', () => {
            const longTitle = 'a'.repeat(201);
            expect(validateArticleTitle(longTitle)).toBe(
                'Le titre ne peut pas dépasser 200 caractères'
            );
        });
    });

    describe('validateArticleContent', () => {
        it('devrait retourner null pour un contenu valide', () => {
            expect(validateArticleContent('Ceci est un contenu valide')).toBeNull();
        });

        it('devrait retourner une erreur pour un contenu vide', () => {
            expect(validateArticleContent('')).toBe('Le contenu est requis');
        });

        it('devrait retourner une erreur pour un contenu trop court', () => {
            expect(validateArticleContent('court')).toBe(
                'Le contenu doit contenir au moins 10 caractères'
            );
        });
    });

    describe('validateAuthor', () => {
        it('devrait retourner null pour un auteur valide', () => {
            expect(validateAuthor('John Doe')).toBeNull();
        });

        it('devrait retourner une erreur pour un auteur vide', () => {
            expect(validateAuthor('')).toBe('Le nom de l\'auteur est requis');
        });

        it('devrait retourner une erreur pour un auteur trop court', () => {
            expect(validateAuthor('A')).toBe(
                'Le nom doit contenir au moins 2 caractères'
            );
        });

        it('devrait retourner une erreur pour un auteur trop long', () => {
            const longName = 'a'.repeat(101);
            expect(validateAuthor(longName)).toBe(
                'Le nom ne peut pas dépasser 100 caractères'
            );
        });
    });
});