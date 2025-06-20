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

export interface GetReviewsRequest {
    page: number;
    limit: number;
}