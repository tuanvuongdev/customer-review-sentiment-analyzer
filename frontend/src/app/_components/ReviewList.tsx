'use client'

import { Calendar, CheckCircle, Circle, MessageCircle, XCircle, User } from 'lucide-react'
import React from 'react'
import { ReviewProps } from '../../../types/review.type'
import { IMetadata } from '../../../types/common.type'

const AnalyzeList = ({ reviews }: { reviews: IMetadata<ReviewProps> }) => {
    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case 'positive':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'negative':
                return <XCircle className="w-4 h-4 text-red-500" />
            case 'neutral':
                return <Circle className="w-4 h-4 text-gray-500" />
            default:
                return null
        }
    }

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'positive':
                return 'bg-green-100 text-green-800'
        }
    }

    return (
        <>
            {
                reviews.data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No reviews found</p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {reviews.data.map((review, index) => (
                            <div key={review.text + "-" + index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        {/* <span className="text-sm font-medium text-gray-700">{review.author}</span> */}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getSentimentIcon(review.sentiment)}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(review.sentiment)}`}>
                                            {review.sentiment}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-900 mb-3">{review.text}</p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {/* {new Date(review.createdAt).toLocaleDateString()} */}
                                    </div>
                                    {/* <span>Confidence: {(review.confidence * 100).toFixed(1)}%</span> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </ >
    )
}

export default AnalyzeList