import { prisma } from "../dbs/init.prisma";
import { ISentiment, Pagination, SentimentResponse } from "../types/review.types";
import natural from "natural"

export const analyzeSentiment = async ({ text }: { text: string }): Promise<SentimentResponse> => {
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const tokenizer = new natural.WordTokenizer();

    const tokens = tokenizer.tokenize(text.toLowerCase());
    const score = analyzer.getSentiment(tokens);

    const normalizedScore = isNaN(score) ? 0 : score;

    let confidence;
    const absScore = Math.abs(normalizedScore);

    if (absScore >= 0.3) {
        confidence = Math.min(0.7 + (absScore - 0.3) * 1.5, 1.0);
    } else if (absScore >= 0.1) {
        confidence = 0.6 + (absScore - 0.1) * 1.0;
    } else {
        confidence = Math.max(0.61, 0.1 + tokens.length * 0.02);
    }

    confidence = Math.max(0.1, Math.min(confidence, 1.0));
    let sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';

    if (normalizedScore > 0.1) sentiment = 'POSITIVE';
    else if (normalizedScore < -0.1) sentiment = 'NEGATIVE';

    const scores = {
        positive: Math.max(0, normalizedScore),
        negative: Math.max(0, -normalizedScore),
        neutral: Math.max(0.1, 1 - Math.abs(normalizedScore)),
    };

    const scoreSum = scores.positive + scores.negative + scores.neutral;
    scores.positive = scores.positive / scoreSum;
    scores.negative = scores.negative / scoreSum;
    scores.neutral = scores.neutral / scoreSum;

    const newReview = await prisma.review.create({
        data: {
            text,
            sentiment,
            confidence,
            negativeScore: scores.negative,
            positiveScore: scores.positive,
            neutralScore: scores.neutral
        }
    })

    return {
        text: newReview.text,
        sentiment: (newReview?.sentiment as ISentiment),
        confidence: parseFloat(confidence.toFixed(2)),
        scores: {
            positive: parseFloat(scores.positive.toFixed(3)),
            negative: parseFloat(scores.negative.toFixed(3)),
            neutral: parseFloat(scores.neutral.toFixed(3))
        },
    };
}

export const findAllReviews = async ({ page, limit }: { page: number, limit: number }): Promise<{ data: SentimentResponse[], pagination: Pagination }> => {
    const [reviews, total] = await Promise.all([
        prisma.review.findMany({
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
        }),
        prisma.review.count()
    ])
    return {
        data: reviews.map((review) => ({
            text: review.text,
            sentiment: review.sentiment as ISentiment,
            confidence: review.confidence,
            scores: {
                positive: review.positiveScore,
                negative: review.negativeScore,
                neutral: review.neutralScore
            },
        })),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}