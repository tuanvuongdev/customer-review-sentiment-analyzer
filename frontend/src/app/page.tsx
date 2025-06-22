import { getReviews } from "@/apis/analyze-sentiment";
import AnalyzeForm from "./_components/AnalyzeForm";
import ReviewList from "./_components/ReviewList";
import { Suspense } from "react";
import PaginationList from "./_components/PaginationList";
import { History, MessageCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string; refresh?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { page = '1', limit = '10' } = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <MessageCircle className="w-10 h-10 text-blue-600" />
            Customer Review Sentiment Analyzer
          </h1>
        </div>

        <AnalyzeForm />

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <History className="w-6 h-6 text-blue-600" />
              Recent Reviews
            </h2>
          </div>
          <Suspense fallback={<ReviewsLoadingSkeleton />} key={`${page}-${limit}`}>
            <RecentReviews page={page} limit={limit} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function RecentReviews({ page, limit }: { page: string, limit: string }) {
  const reviews = await getReviews(page, limit);

  return (
    <div className="flex flex-col gap-8">
      <ReviewList reviews={reviews} />
      <PaginationList currentPage={page} totalPages={reviews.pagination.totalPages} />
    </div>
  )
}

function ReviewsLoadingSkeleton() {
  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-full" />
        ))}
      </div>
      <Skeleton className="mx-auto h-8 w-[220px]" />
    </div>
  );
}