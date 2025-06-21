export interface ReviewProps {
    text: string;
    sentiment: string;
    confidence: number;
    scores: Scores;
}

export interface Scores {
    positive: number;
    negative: number;
    neutral: number;
}