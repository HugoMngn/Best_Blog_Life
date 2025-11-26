/**
 * Tests pour les fonctions de formatage de dates
 */
import { describe, it, expect } from 'vitest';
import { formatDate, formatRelativeTime } from '../../utils/dateFormatter';

describe('Date Formatters', () => {
    describe('formatDate', () => {
        it('devrait formater une date correctement', () => {
            const date = '2024-01-15T10:30:00Z';
            const formatted = formatDate(date);
            expect(formatted).toContain('2024');
        });
    });

    describe('formatRelativeTime', () => {
        it('devrait retourner "À l\'instant" pour une date très récente', () => {
            const now = new Date().toISOString();
            expect(formatRelativeTime(now)).toBe('À l\'instant');
        });

        it('devrait retourner le temps en minutes', () => {
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
            const result = formatRelativeTime(fiveMinutesAgo);
            expect(result).toContain('minutes');
        });

        it('devrait retourner le temps en heures', () => {
            const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
            const result = formatRelativeTime(twoHoursAgo);
            expect(result).toContain('heures');
        });
    });
});
