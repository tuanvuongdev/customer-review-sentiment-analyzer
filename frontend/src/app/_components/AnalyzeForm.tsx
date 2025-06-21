'use client'

import { BarChart3, Send } from 'lucide-react'
import React, { useState } from 'react'

const AnalyzeForm = () => {
    const [reviewText, setReviewText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    // const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyzeReview = async () => {
        setIsAnalyzing(true);
        // const result = await analyzeSentiment({ text: reviewText });
        // setAnalysisResult(result);
        setIsAnalyzing(false);
    }

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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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