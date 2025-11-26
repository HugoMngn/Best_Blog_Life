/**
 * Configuration des tests
 */
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Nettoie après chaque test
afterEach(() => {
    cleanup();
});