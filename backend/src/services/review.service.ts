import { prisma } from "../dbs/init.prisma";
import { ISentiment, SentimentResponse } from "../types/review.types";
import natural from "natural"

export const analyzeSentiment = async ({ text }: { text: string }): Promise<SentimentResponse> => {
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const tokenizer = new natural.WordTokenizer();

    const tokens = tokenizer.tokenize(text.toLowerCase());
    const score = analyzer.getSentiment(tokens);

    const sentiment =
        score > 0.5 ? 'POSITIVE' :
            score < -0.5 ? 'NEGATIVE' :
                'NEUTRAL';

    const confidence = Math.min(Math.abs(score) / 5, 1);
    const negativeScore = score < 0 ? -score : 0
    const positiveScore = score > 0 ? score : 0
    const neutralScore = score === 0 ? 1 : 0

    const newReview = await prisma.review.create({
        data: {
            text,
            sentiment,
            confidence,
            negativeScore,
            positiveScore,
            neutralScore
        }
    })

    return {
        text: newReview.text,
        sentiment: (newReview?.sentiment as ISentiment),
        confidence: parseFloat(confidence.toFixed(2)),
        scores: {
            positive: score > 0 ? score : 0,
            negative: score < 0 ? -score : 0,
            neutral: score === 0 ? 1 : 0
        },
    };
}

export const findAllReviews = async ({ page, limit }: { page: number, limit: number }): Promise<SentimentResponse[]> => {
    const reviews = await prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: false,
            text: true,
            sentiment: true,
            confidence: true,
            positiveScore: true,
            negativeScore: true,
            neutralScore: true,
            createdAt: false,
        }
    });
    return reviews.map((review) => ({
        text: review.text,
        sentiment: review.sentiment as ISentiment,
        confidence: review.confidence,
        scores: {
            positive: review.positiveScore,
            negative: review.negativeScore,
            neutral: review.neutralScore
        },
    }));
}