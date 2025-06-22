import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Mock Prisma Client
export const createMockPrisma = () => ({
    review: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
});

// Mock Express Request
export const createMockRequest = (body: any = {}, query: any = {}, params: any = {}) => {
    return {
        body,
        query,
        params,
        headers: {},
        method: 'GET',
        url: '/',
    } as Request;
};

// Mock Express Response
export const createMockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.set = jest.fn().mockReturnValue(res);
    return res;
};

// Mock Express Next Function
export const createMockNext = () => jest.fn();

// Sample review data for testing
export const sampleReviews = {
    positive: {
        text: 'Amazing pizza! Great service and fast delivery. Highly recommend!',
        sentiment: 'POSITIVE' as const,
        confidence: 0.85,
        scores: {
            positive: 0.7,
            negative: 0.1,
            neutral: 0.2
        }
    },
    negative: {
        text: 'Terrible coffee, rude staff, and overpriced. Never going back.',
        sentiment: 'NEGATIVE' as const,
        confidence: 0.78,
        scores: {
            positive: 0.1,
            negative: 0.7,
            neutral: 0.2
        }
    },
    neutral: {
        text: 'Food was okay, nothing special. Service was average.',
        sentiment: 'NEUTRAL' as const,
        confidence: 0.65,
        scores: {
            positive: 0.2,
            negative: 0.2,
            neutral: 0.6
        }
    }
};

// Sample database review objects
export const sampleDbReviews = {
    positive: {
        id: 1,
        text: sampleReviews.positive.text,
        sentiment: sampleReviews.positive.sentiment,
        confidence: sampleReviews.positive.confidence,
        positiveScore: sampleReviews.positive.scores.positive,
        negativeScore: sampleReviews.positive.scores.negative,
        neutralScore: sampleReviews.positive.scores.neutral,
        createdAt: new Date('2025-01-01T00:00:00Z')
    },
    negative: {
        id: 2,
        text: sampleReviews.negative.text,
        sentiment: sampleReviews.negative.sentiment,
        confidence: sampleReviews.negative.confidence,
        positiveScore: sampleReviews.negative.scores.positive,
        negativeScore: sampleReviews.negative.scores.negative,
        neutralScore: sampleReviews.negative.scores.neutral,
        createdAt: new Date('2025-01-01T00:00:00Z')
    },
    neutral: {
        id: 3,
        text: sampleReviews.neutral.text,
        sentiment: sampleReviews.neutral.sentiment,
        confidence: sampleReviews.neutral.confidence,
        positiveScore: sampleReviews.neutral.scores.positive,
        negativeScore: sampleReviews.neutral.scores.negative,
        neutralScore: sampleReviews.neutral.scores.neutral,
        createdAt: new Date('2025-01-01T00:00:00Z')
    }
};

// Validation test cases
export const validationTestCases = {
    valid: [
        { text: 'Valid review text' },
        { text: 'a'.repeat(500) }, // Exactly 500 characters
        { text: 'Great food! 🍕 Amazing service 😊' },
        { text: 'The food was 5/5 stars! Price: $25.99' }
    ],
    invalid: [
        { text: '' }, // Empty text
        { text: 'a'.repeat(501) }, // Too long
        { text: 123 as any }, // Non-string
        {} // Missing text field
    ]
};

// Pagination test cases
export const paginationTestCases = {
    valid: [
        { page: '1', limit: '10' },
        { page: '2', limit: '5' },
        { page: '10', limit: '100' }
    ],
    edgeCases: [
        { page: '0', limit: '0' },
        { page: '-1', limit: '-5' },
        { page: '999999', limit: '999999' },
        { page: 'invalid', limit: 'invalid' }
    ]
};

// Error scenarios
export const errorScenarios = {
    database: {
        connection: new Error('Database connection failed'),
        timeout: new Error('Database timeout'),
        constraint: new Error('Unique constraint violation')
    },
    validation: {
        emptyText: 'Text is required',
        tooLong: 'Text must be less than 500 characters',
        invalidType: 'Expected string, received number'
    }
};

// Helper function to create multiple reviews
export const createMultipleReviews = (count: number, baseText = 'Review') => {
    return Array(count).fill(null).map((_, index) => ({
        id: index + 1,
        text: `${baseText} ${index + 1}`,
        sentiment: index % 3 === 0 ? 'POSITIVE' : index % 3 === 1 ? 'NEGATIVE' : 'NEUTRAL',
        confidence: 0.8,
        positiveScore: 0.6,
        negativeScore: 0.2,
        neutralScore: 0.2,
        createdAt: new Date(`2025-01-${String(index + 1).padStart(2, '0')}T00:00:00Z`)
    }));
};

// Helper function to setup Prisma mocks
export const setupPrismaMocks = (mockPrisma: any) => {
    // Reset all mocks
    Object.values(mockPrisma.review).forEach((mock: any) => {
        if (typeof mock === 'function' && mock.mockClear) {
            mock.mockClear();
        }
    });
};

// Helper function to verify response structure
export const verifySuccessResponse = (response: any, expectedMessage: string, expectedStatus: number = 200) => {
    expect(response.body).toHaveProperty('status', expectedStatus);
    expect(response.body).toHaveProperty('message', expectedMessage);
    expect(response.body).toHaveProperty('metadata');
};

// Helper function to verify error response structure
export const verifyErrorResponse = (response: any, expectedStatus: number) => {
    expect(response.body).toHaveProperty('status', expectedStatus);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(expectedStatus);
};

// Helper function to verify pagination structure
export const verifyPagination = (pagination: any, expectedPage: number, expectedLimit: number, expectedTotal: number) => {
    expect(pagination).toHaveProperty('page', expectedPage);
    expect(pagination).toHaveProperty('limit', expectedLimit);
    expect(pagination).toHaveProperty('total', expectedTotal);
    expect(pagination).toHaveProperty('totalPages');
    expect(pagination.totalPages).toBe(Math.ceil(expectedTotal / expectedLimit));
}; 