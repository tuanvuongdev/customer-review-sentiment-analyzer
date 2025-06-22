import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import React from 'react'

const PaginationList = ({ currentPage, totalPages }: { currentPage: string, totalPages: number }) => {
    const currentPageNumber = parseInt(currentPage);
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={`/?page=${currentPageNumber - 1}`}
                        aria-disabled={currentPageNumber <= 1}
                        tabIndex={currentPageNumber <= 1 ? -1 : undefined}
                        className={
                            currentPageNumber <= 1 ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                </PaginationItem>
                {/* <PaginationItem>
                        <PaginationLink href={`/reviews?page=1`}>1</PaginationLink>
                    </PaginationItem> */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href={`/?page=${index + 1}`} isActive={currentPageNumber === index + 1}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {totalPages > 3 && currentPageNumber < totalPages - 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        href={`/?page=${currentPageNumber + 1}`}
                        aria-disabled={currentPageNumber >= totalPages}
                        tabIndex={currentPageNumber >= totalPages ? -1 : undefined}
                        className={
                            currentPageNumber >= totalPages ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationList