import React from 'react'
import RecommendedCard from './RecommendedCard'
import RecommendedCardSkeleton from './RecommendedCardSkeleton'

const RecommendationSegment = ({ title, booksData = [], loading = false }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {Array.from({ length: 5 }).map((_, idx) => (
            <RecommendedCardSkeleton key={idx} />
          ))}
        </div>
      ) : booksData.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {booksData.map(book => (
            <RecommendedCard key={book.isbn} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">
          No recommendations available for this section.
        </p>
      )}
    </div>
  );
};

export default RecommendationSegment;
