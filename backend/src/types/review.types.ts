export interface SentimentResult {
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    confidence: number; // 0.0 to 1.0
    scores: {
        positive: number;
        negative: number;
        neutral: number;
    };
}