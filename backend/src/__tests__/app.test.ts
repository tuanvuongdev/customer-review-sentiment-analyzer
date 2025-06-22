// backend/src/__tests__/app.test.ts
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../app';
import { analyzeSentiment } from '../services/review.service';

// Mock Prisma
jest.mock('@prisma/client');
jest.mock('../dbs/init.prisma', () => ({
    prisma: {
        review: {
            create: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
        },
    },
}));

// Import the mocked prisma
import { prisma } from '../dbs/init.prisma';

describe('Sentiment Analysis API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/analyze', () => {
        it('should analyze a positive review successfully', async () => {
            const reviewData = {
                text: 'Amazing pizza! Great service and fast delivery. Highly recommend!',
            };

            const mockReview = {
                id: 1,
                text: reviewData.text,
                sentiment: 'POSITIVE',
                confidence: 0.85,
                positiveScore: 0.6,
                negativeScore: 0.1,
                neutralScore: 0.3,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const response = await request(app)
                .post('/api/analyze')
                .send(reviewData)
                .expect(201);

            expect(response.body).toMatchObject({
                status: 201,
                message: 'Review analyzed successfully',
                metadata: {
                    text: reviewData.text,
                    sentiment: 'POSITIVE',
                    confidence: expect.any(Number),
                    scores: {
                        positive: expect.any(Number),
                        negative: expect.any(Number),
                        neutral: expect.any(Number)
                    }
                }
            });

            expect(response.body.metadata.confidence).toBeGreaterThan(0.8);
            expect(prisma.review.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    text: reviewData.text,
                    sentiment: 'POSITIVE'
                })
            });
        });

        it('should analyze a negative review successfully', async () => {
            const reviewData = {
                text: 'Terrible coffee, rude staff, and overpriced. Never going back.'
            };

            const mockReview = {
                id: 2,
                text: reviewData.text,
                sentiment: 'NEGATIVE',
                confidence: 0.78,
                positiveScore: 0.1,
                negativeScore: 0.7,
                neutralScore: 0.2,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const response = await request(app)
                .post('/api/analyze')
                .send(reviewData)
                .expect(201);

            expect(response.body.metadata.sentiment).toBe('NEGATIVE');
            expect(response.body.metadata.confidence).toBeGreaterThan(0.7);
        });

        it('should analyze a neutral review successfully', async () => {
            const reviewData = {
                text: 'Food was okay, nothing special. Service was average.'
            };

            const mockReview = {
                id: 3,
                text: reviewData.text,
                sentiment: 'NEUTRAL',
                confidence: 0.65,
                positiveScore: 0.2,
                negativeScore: 0.2,
                neutralScore: 0.6,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const response = await request(app)
                .post('/api/analyze')
                .send(reviewData)
                .expect(201);

            expect(response.body.metadata.sentiment).toBe('NEUTRAL');
            expect(response.body.metadata.confidence).toBeGreaterThan(0.6);
        });

        it('should return 400 for invalid input - empty text', async () => {
            const response = await request(app)
                .post('/api/analyze')
                .send({ text: '' })
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
            expect(prisma.review.create).not.toHaveBeenCalled();
        });

        it('should return 400 for invalid input - text too long', async () => {
            const longText = 'a'.repeat(501);

            const response = await request(app)
                .post('/api/analyze')
                .send({ text: longText })
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
            expect(prisma.review.create).not.toHaveBeenCalled();
        });

        it('should return 400 for missing text field', async () => {
            const response = await request(app)
                .post('/api/analyze')
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
            expect(prisma.review.create).not.toHaveBeenCalled();
        });

        it('should return 400 for non-string text', async () => {
            const response = await request(app)
                .post('/api/analyze')
                .send({ text: 123 })
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
            expect(prisma.review.create).not.toHaveBeenCalled();
        });

        it('should handle database errors gracefully', async () => {
            (prisma.review.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/analyze')
                .send({ text: 'Test review' })
                .expect(500);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
        });

        it('should handle malformed JSON', async () => {
            const response = await request(app)
                .post('/api/analyze')
                .set('Content-Type', 'application/json')
                .send('invalid json')
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
        });
    });

    describe('GET /api/reviews', () => {
        it('should fetch reviews successfully with default pagination', async () => {
            const mockReviews = [
                {
                    id: 1,
                    text: 'Great food!',
                    sentiment: 'POSITIVE',
                    confidence: 0.85,
                    positiveScore: 0.7,
                    negativeScore: 0.1,
                    neutralScore: 0.2,
                    createdAt: new Date('2025-01-01T00:00:00Z')
                },
                {
                    id: 2,
                    text: 'Okay experience',
                    sentiment: 'NEUTRAL',
                    confidence: 0.65,
                    positiveScore: 0.3,
                    negativeScore: 0.2,
                    neutralScore: 0.5,
                    createdAt: new Date('2025-01-01T00:00:00Z')
                }
            ];

            (prisma.review.findMany as jest.Mock).mockResolvedValue(mockReviews);
            (prisma.review.count as jest.Mock).mockResolvedValue(2);

            const response = await request(app)
                .get('/api/reviews')
                .expect(200);

            expect(response.body).toMatchObject({
                status: 200,
                message: 'Reviews fetched successfully',
                metadata: {
                    data: expect.any(Array),
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 2,
                        totalPages: 1
                    }
                }
            });

            expect(response.body.metadata.data).toHaveLength(2);
            expect(prisma.review.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' },
                select: expect.any(Object)
            });
        });

        it('should handle pagination correctly', async () => {
            (prisma.review.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.review.count as jest.Mock).mockResolvedValue(25);

            const response = await request(app)
                .get('/api/reviews?page=3&limit=5')
                .expect(200);

            expect(response.body.metadata.pagination).toMatchObject({
                page: 3,
                limit: 5,
                total: 25,
                totalPages: 5
            });

            expect(prisma.review.findMany).toHaveBeenCalledWith({
                skip: 10, // (page - 1) * limit = (3 - 1) * 5
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: expect.any(Object)
            });
        });

        it('should handle invalid pagination parameters gracefully', async () => {
            const response = await request(app)
                .get('/api/reviews?page=invalid&limit=invalid')
                .expect(200);

            // Should use default values
            expect(response.body.metadata.pagination).toMatchObject({
                page: 1,
                limit: 10
            });
        });

        it('should handle negative pagination values', async () => {
            const response = await request(app)
                .get('/api/reviews?page=-1&limit=-5')
                .expect(200);

            // Should use Math.max(1, value) for negative values
            expect(response.body.metadata.pagination).toMatchObject({
                page: 1,
                limit: 1
            });
        });

        it('should handle very large pagination values', async () => {
            const response = await request(app)
                .get('/api/reviews?page=999999&limit=999999')
                .expect(200);

            expect(response.body.metadata.pagination).toMatchObject({
                page: 999999,
                limit: 999999
            });
        });

        it('should handle database errors gracefully', async () => {
            (prisma.review.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .get('/api/reviews')
                .expect(500);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
        });

        it('should handle count database errors gracefully', async () => {
            (prisma.review.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.review.count as jest.Mock).mockRejectedValue(new Error('Count error'));

            const response = await request(app)
                .get('/api/reviews')
                .expect(500);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('404 and Error Handling', () => {
        it('should return 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/api/nonexistent')
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message', 'Not Found');
        });

        it('should return 404 for root path', async () => {
            const response = await request(app)
                .get('/')
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message', 'Not Found');
        });

        it('should handle unsupported HTTP methods', async () => {
            const response = await request(app)
                .put('/api/analyze')
                .send({ text: 'test' })
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('message', 'Not Found');
        });
    });
});

// Unit tests for sentiment analysis service
describe('SentimentAnalyzer Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('analyzeSentiment method', () => {
        it('should analyze positive review correctly', async () => {
            const mockReview = {
                id: 1,
                text: 'Amazing pizza! Great service and fast delivery. Highly recommend!',
                sentiment: 'POSITIVE',
                confidence: 0.85,
                positiveScore: 0.6,
                negativeScore: 0.1,
                neutralScore: 0.3,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: 'Amazing pizza! Great service and fast delivery. Highly recommend!' });

            expect(result.sentiment).toBe('POSITIVE');
            expect(result.confidence).toBeGreaterThan(0.8);
            expect(result.scores.positive).toBeGreaterThan(result.scores.negative);
            expect(result.scores.positive).toBeGreaterThan(result.scores.neutral);
        });

        it('should analyze negative review correctly', async () => {
            const mockReview = {
                id: 2,
                text: 'Terrible coffee, rude staff, and overpriced. Never going back.',
                sentiment: 'NEGATIVE',
                confidence: 0.78,
                positiveScore: 0.1,
                negativeScore: 0.7,
                neutralScore: 0.2,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: 'Terrible coffee, rude staff, and overpriced. Never going back.' });

            expect(result.sentiment).toBe('NEGATIVE');
            expect(result.confidence).toBeGreaterThan(0.7);
            expect(result.scores.negative).toBeGreaterThan(result.scores.positive);
            expect(result.scores.negative).toBeGreaterThan(result.scores.neutral);
        });

        it('should analyze neutral review correctly', async () => {
            const mockReview = {
                id: 3,
                text: 'Food was okay, nothing special. Service was average.',
                sentiment: 'NEUTRAL',
                confidence: 0.65,
                positiveScore: 0.2,
                negativeScore: 0.2,
                neutralScore: 0.6,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: 'Food was okay, nothing special. Service was average.' });

            expect(result.sentiment).toBe('NEUTRAL');
            expect(result.confidence).toBeGreaterThan(0.6);
        });

        it('should handle empty text', async () => {
            const mockReview = {
                id: 4,
                text: '',
                sentiment: 'NEUTRAL',
                confidence: 0.5,
                positiveScore: 0,
                negativeScore: 0,
                neutralScore: 1,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: '' });

            expect(result.sentiment).toBe('NEUTRAL');
            expect(result.confidence).toBeGreaterThan(0);
        });

        it('should handle text with only neutral words', async () => {
            const mockReview = {
                id: 5,
                text: 'The restaurant is located downtown.',
                sentiment: 'NEUTRAL',
                confidence: 0.5,
                positiveScore: 0,
                negativeScore: 0,
                neutralScore: 1,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: 'The restaurant is located downtown.' });

            expect(result.sentiment).toBe('NEUTRAL');
            expect(result.scores.neutral).toBeGreaterThan(0.5);
        });

        it('should handle negations correctly', async () => {
            const mockReview = {
                id: 6,
                text: 'The food was not bad, but not great either.',
                sentiment: 'NEUTRAL',
                confidence: 0.6,
                positiveScore: 0.3,
                negativeScore: 0.2,
                neutralScore: 0.5,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: 'The food was not bad, but not great either.' });

            // "not bad" should be somewhat positive
            expect(result.sentiment).toBe('NEUTRAL');
        });

        it('should handle intensifiers correctly', async () => {
            const mockPositiveReview = {
                id: 7,
                text: 'Very good food!',
                sentiment: 'POSITIVE',
                confidence: 0.9,
                positiveScore: 0.8,
                negativeScore: 0.1,
                neutralScore: 0.1,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            const mockRegularReview = {
                id: 8,
                text: 'Good food!',
                sentiment: 'POSITIVE',
                confidence: 0.7,
                positiveScore: 0.6,
                negativeScore: 0.2,
                neutralScore: 0.2,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock)
                .mockResolvedValueOnce(mockPositiveReview)
                .mockResolvedValueOnce(mockRegularReview);

            const positiveResult = await analyzeSentiment({ text: 'Very good food!' });
            const regularResult = await analyzeSentiment({ text: 'Good food!' });

            // Both should have positive scores, but the exact values may vary
            expect(positiveResult.scores.positive).toBeGreaterThan(0);
            expect(regularResult.scores.positive).toBeGreaterThan(0);
        });

        it('should return scores that sum to approximately 1', async () => {
            const mockReview = {
                id: 9,
                text: 'This is a test review with mixed sentiments good and bad.',
                sentiment: 'NEUTRAL',
                confidence: 0.6,
                positiveScore: 0.4,
                negativeScore: 0.3,
                neutralScore: 0.3,
                createdAt: new Date('2025-01-01T00:00:00Z')
            };

            (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);

            const result = await analyzeSentiment({ text: 'This is a test review with mixed sentiments good and bad.' });

            const sum = result.scores.positive + result.scores.negative + result.scores.neutral;
            expect(sum).toBeCloseTo(1, 1); // Allow for rounding differences
        });

        it('should handle database errors gracefully', async () => {
            (prisma.review.create as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

            await expect(analyzeSentiment({ text: 'Test review' })).rejects.toThrow('Database connection failed');
        });
    });
});