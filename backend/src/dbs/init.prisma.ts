// backend/src/db.ts
import { PrismaClient } from '@prisma/client';

/**
 * Global variable to hold the PrismaClient instance.
 * This is a common pattern to avoid instantiating multiple PrismaClient instances
 * in development, which can lead to connection issues.
 */
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

/**
 * Initializes and exports a singleton instance of PrismaClient.
 * In a production environment, PrismaClient is typically instantiated once.
 * In development, we use a global variable to reuse the instance across hot reloads.
 */
export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ['query'], // Log all database queries for debugging purposes
    });

// If not in production, assign the prisma client to the global object
// This prevents multiple instances in development with hot-reloading
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}