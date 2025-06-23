export type ISentiment = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'

export interface SentimentRequest {
    sentiment: ISentiment;
    confidence: number;
    scores: {
        positive: number;
        negative: number;
        neutral: number;
    };
}

export interface SentimentResponse {
    text: string;
    sentiment: ISentiment;
    confidence: number;
    scores: {
        positive: number;
        negative: number;
        neutral: number;
    };
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface GetReviewsRequest {
    page: number;
    limit: number;
}

export interface ReviewsPrisma {
    text: string;
    sentiment: ISentiment;
    confidence: number;
    positiveScore: number;
    negativeScore: number;
    neutralScore: number;
}