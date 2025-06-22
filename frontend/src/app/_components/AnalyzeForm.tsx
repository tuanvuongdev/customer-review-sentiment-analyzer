'use client'

import { analyzeReview } from '@/apis/analyze-sentiment';
import { ReviewProps } from '@/types/review.type';
import { BarChart3, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const AnalyzeForm = () => {
    const [reviewText, setReviewText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ReviewProps | null>(null);
    const router = useRouter();

    const handleAnalyzeReview = async () => {
        setIsAnalyzing(true);
        try {
            const result = await analyzeReview(reviewText);
            setAnalysisResult(result.metadata);
            setReviewText('');
            toast.success('Review analyzed successfully!');
            router.refresh();
        } catch {
            toast.error('Error analyzing review. Please try again later.');
        } finally {
            setIsAnalyzing(false);
        }
    }

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'NEGATIVE':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Analyze New Review
            </h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                        Review Text
                    </label>
                    <textarea
                        id="review"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Enter customer review (max 500 characters)..."
                        rows={4}
                        maxLength={500}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 ease-in-out resize-y min-h-[100px]"
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                        {reviewText.length}/500 characters
                    </div>
                </div>

                <button
                    onClick={handleAnalyzeReview}
                    disabled={isAnalyzing || !reviewText.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                    {isAnalyzing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Analyze Sentiment
                        </>
                    )}
                </button>
            </div>

            {analysisResult && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Result</h3>

                    <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentColor(analysisResult.sentiment)}`}>
                            {analysisResult.sentiment}
                        </span>
                        <span className="text-gray-600">
                            Confidence: {(analysisResult.confidence * 100).toFixed(1)}%
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex gap-4 items-center">
                            <span className="text-sm text-gray-600">Positive</span>
                            <span className="text-sm font-medium text-green-600">
                                {(analysisResult.scores.positive).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <span className="text-sm text-gray-600">Negative</span>
                            <span className="text-sm font-medium text-red-600">
                                {(analysisResult.scores.negative).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <span className="text-sm text-gray-600">Neutral</span>
                            <span className="text-sm font-medium text-gray-600">
                                {(analysisResult.scores.neutral).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AnalyzeForm