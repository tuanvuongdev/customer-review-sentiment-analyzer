'use client'

import { analyzeReview } from '@/apis/analyze-sentiment';
import { ReviewProps } from '@/types/review.type';
import { BarChart3, Send } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner';

const AnalyzeForm = () => {
    const [reviewText, setReviewText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ReviewProps | null>(null);

    const handleAnalyzeReview = async () => {
        setIsAnalyzing(true);
        try {
            const result = await analyzeReview(reviewText);
            setAnalysisResult(result.metadata);
        } catch {
            toast.error('Error analyzing review. Please try again later.');
        } finally {
            setIsAnalyzing(false);
        }
    }

    console.log(analysisResult);

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

        </div>
    )
}

export default AnalyzeForm