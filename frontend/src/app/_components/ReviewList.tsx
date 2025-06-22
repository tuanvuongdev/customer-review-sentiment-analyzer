import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { IMetadata } from '@/types/common.type'
import { ReviewProps } from '@/types/review.type'

const AnalyzeList = ({ reviews }: { reviews: IMetadata<ReviewProps> }) => {
    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return 'bg-green-100 text-green-800'
            case 'NEGATIVE':
                return 'bg-red-100 text-red-800'
            case 'NEUTRAL':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <>
            {/* {
                reviews.data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No reviews found</p>
                    </div>
                ) : ( */}
            <div className="space-y-4 h-[500px] overflow-y-auto">
                {reviews.data.map((review, index) => (
                    <div key={`${review.text.substring(0, 20)}-${index}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <p className="text-gray-900 mb-3 max-w-1/2 truncate">Text: {review.text}</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{review.text}</p>
                                </TooltipContent>
                            </Tooltip>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(review.sentiment)}`}>
                                {review.sentiment}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <div className="space-y-2">
                                <div className="flex gap-4 items-center">
                                    <span className="text-sm text-gray-600">Positive</span>
                                    <span className="text-sm font-medium text-green-600">
                                        {(review.scores.positive).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-sm text-gray-600">Negative</span>
                                    <span className="text-sm font-medium text-red-600">
                                        {(review.scores.negative).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-sm text-gray-600">Neutral</span>
                                    <span className="text-sm font-medium text-gray-600">
                                        {(review.scores.neutral).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <span>Confidence: {(review.confidence * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* )
            } */}

        </ >
    )
}

export default AnalyzeList