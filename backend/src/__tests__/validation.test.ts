import { z } from 'zod';
import AnalyzeRequest from '../helpers/validations/analyze.request';

describe('Validation Tests', () => {
    describe('AnalyzeRequest Validation', () => {
        it('should validate correct input', () => {
            const validData = {
                text: 'This is a valid review text'
            };

            const result = AnalyzeRequest.validate(validData);
            expect(result.success).toBe(true);

            if (result.success) {
                expect(result.data).toEqual(validData);
            }
        });

        it('should reject empty text', () => {
            const invalidData = {
                text: ''
            };

            const result = AnalyzeRequest.validate(invalidData);
            expect(result.success).toBe(false);

            if (!result.success) {
                expect(result.error.issues).toHaveLength(1);
                expect(result.error.issues[0].message).toBe('Text is required');
            }
        });

        it('should reject text that is too long', () => {
            const invalidData = {
                text: 'a'.repeat(501)
            };

            const result = AnalyzeRequest.validate(invalidData);
            expect(result.success).toBe(false);

            if (!result.success) {
                expect(result.error.issues).toHaveLength(1);
                expect(result.error.issues[0].message).toBe('Text must be less than 500 characters');
            }
        });

        it('should reject non-string text', () => {
            const invalidData = {
                text: 123 as any
            };

            const result = AnalyzeRequest.validate(invalidData);
            expect(result.success).toBe(false);

            if (!result.success) {
                expect(result.error.issues).toHaveLength(1);
                expect(result.error.issues[0].message).toBe('Expected string, received number');
            }
        });

        it('should reject missing text field', () => {
            const invalidData = {} as any;

            const result = AnalyzeRequest.validate(invalidData);
            expect(result.success).toBe(false);

            if (!result.success) {
                expect(result.error.issues).toHaveLength(1);
                expect(result.error.issues[0].message).toBe('Required');
            }
        });

        it('should accept text with exactly 500 characters', () => {
            const validData = {
                text: 'a'.repeat(500)
            };

            const result = AnalyzeRequest.validate(validData);
            expect(result.success).toBe(true);
        });

        it('should accept text with special characters', () => {
            const validData = {
                text: 'Great food! 🍕 Amazing service 😊 Highly recommend!'
            };

            const result = AnalyzeRequest.validate(validData);
            expect(result.success).toBe(true);
        });

        it('should accept text with numbers and symbols', () => {
            const validData = {
                text: 'The food was 5/5 stars! Price: $25.99 - worth every penny!'
            };

            const result = AnalyzeRequest.validate(validData);
            expect(result.success).toBe(true);
        });
    });

    describe('AnalyzeRequest Constructor', () => {
        it('should create instance with valid data', () => {
            const data = { text: 'Test review' };
            const request = new AnalyzeRequest(data);

            expect(request.text).toBe('Test review');
        });
    });
}); 