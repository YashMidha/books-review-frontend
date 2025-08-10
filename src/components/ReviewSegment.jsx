import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';
import { MoveRight } from 'lucide-react';
import { getBookReviews } from '@/services/bookService';
import { toast } from 'react-toastify';

const ReviewSegment = ({ bookId }) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [paginationLoading, setPaginationLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchInitialReviews = async () => {
      setLoading(true);
      try {
        const data = await getBookReviews(bookId, 0);
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
        setPage(1);
      } catch (err) {
        console.error('Error loading reviews:', err);
        toast.error('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchInitialReviews();
    }
  }, [bookId]);

  const loadMoreReviews = async () => {
    if (page === totalPages) return;
    
    setPaginationLoading(true);
    try {
      const data = await getBookReviews(bookId, page+1);
      setReviews(prev => [...prev, ...data.reviews]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error loading more reviews:', err);
      toast.error('Failed to load more reviews. Please try again.');
    } finally {
      setPaginationLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ReviewCardSkeleton key={idx} />
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <ReviewCard review={review} key={review.id || idx} />
          ))}
          <div className="flex justify-end">
            {totalPages !== page && 
            <button
              onClick={loadMoreReviews}
              className='mt-4 px-4 py-2 rounded-md font-medium transition shadow-sm'
            >
              {paginationLoading ? (
                <span>Loading...</span>
              ) : (
                <div className="flex gap-1.5 items-center text-gray-500 font-normal cursor-pointer">
                  <p>Load More</p>
                  <MoveRight className="w-5 h-5" strokeWidth={1.25} />
                </div>
              )}
            </button>
            }
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">
          No reviews yet. Be the first to review this book!
        </p>
      )}
    </div>
  );
};

export default ReviewSegment;
