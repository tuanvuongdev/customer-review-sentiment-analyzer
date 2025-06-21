import { getReviews } from "@/apis/analyze-sentiment";
import AnalyzeForm from "./_components/AnalyzeForm";
import ReviewList from "./_components/ReviewList";
import { Suspense } from "react";
import PaginationList from "./_components/PaginationList";
import { MessageCircle } from "lucide-react";
import { IMetadata } from "../../types/common.type";
import { ReviewProps } from "../../types/review.type";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { page = '1', limit = '10' } = await searchParams;
  console.log(page, limit);

  const reviews = await getReviews(page, limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <MessageCircle className="w-10 h-10 text-blue-600" />
            Customer Review Sentiment Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Analyze customer reviews and understand sentiment with AI-powered insights
          </p>
        </div>

        <AnalyzeForm />

        <RecentReviews reviews={reviews} page={page} limit={limit} />
      </div>
    </div>
  );
}

function RecentReviews({ reviews, page, limit }: { reviews: IMetadata<ReviewProps>, page: string, limit: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          Recent Reviews
        </h2>
      </div>

      <Suspense fallback={<div>Loading...</div>} key={`${page}-${limit}`}>
        <ReviewList reviews={reviews} />
      </Suspense>

      <div className="mt-8">
        <PaginationList currentPage={page} totalPages={reviews.pagination.totalPages} />
      </div>
    </div>

  )
}
