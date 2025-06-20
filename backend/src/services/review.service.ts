import { SentimentResult } from "../types/review.types";

export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
    console.log("text:::", text);

    return {
        sentiment: "POSITIVE",
        confidence: 0,
        scores: {
            negative: 0,
            neutral: 0,
            positive: 0
        }
    };
}