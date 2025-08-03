import React, { useState, useEffect } from 'react'
import ReviewCard from './ReviewCard'
import ReviewCardSkeleton from './ReviewCardSkeleton';
import books from '@/assets/details';
import { MoveRight } from 'lucide-react';
import sleep from '@/utils/sleepFunction';

const ReviewSegment = ({ bookId }) => {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(3);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [paginationLoading, setPaginationLoading] = useState(false);

    const loadMoreReviews = async () => {
      if (page * limit >= totalReviews || paginationLoading) return;

      setPaginationLoading(true);
      try {
        // const res = await axios.get(`/api/reviews?bookId=${bookId}&page=${page}&limit=${limit}`);
        // setReviews(prev => [...prev, ...res.data.reviews]);

        // MOCK:
        const book = books.find(book => book.isbn === bookId);
        const nextBatch = book.reviews.slice(page * limit, (page + 1) * limit);
        setReviews(prev => [...prev, ...nextBatch]);

        setPage(prev => prev + 1);
      } catch (err) {
        console.error('Error loading more reviews:', err);
      } finally {
        setPaginationLoading(false);
      }
    };


    useEffect(() => {
      const fetchInitialReviews = async () => {
        setLoading(true);
        setTimeout(() => {
          try {
            // if using backend:
            // const res = await axios.get(`/api/reviews?bookId=${bookId}&page=0&limit=${limit}`);
            // setReviews(res.data.reviews);
            // setTotalReviews(res.data.totalCount);

            // MOCK DATA SIMULATION:
            const book = books.find(book => book.isbn === bookId);
            const total = book.reviews.length;
            const firstBatch = book.reviews.slice(0, limit);

            setReviews(firstBatch);
            setTotalReviews(total);
            setPage(1);
          } catch (err) {
            console.error('Error loading reviews:', err);
          } finally {
            setLoading(false);
          }
          
        }, 1000);
      };

      fetchInitialReviews();
    }, [bookId]);



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
            <ReviewCard review={review} key={idx} />
          ))}
          <div className='flex justify-end'>
            <button
              onClick={loadMoreReviews}
              disabled={page * limit >= totalReviews}
              className={`mt-4 px-4 py-2 rounded-md font-medium transition shadow-sm
                ${page * limit >= totalReviews && 'hidden'}`}
            >
              {
                page * limit >= totalReviews 
                ? 'No more reviews' 
                : <div className='flex gap-1.5 items-center text-gray-500 font-normal cursor-pointer'>
                    {paginationLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <p>Load More</p> 
                        <MoveRight className='w-5 h-5' strokeWidth={1.25} />
                      </>
                    )}
                  </div>
              }
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">
          No reviews yet. Be the first to review this book!
        </p>
      )}
    </div>
  )
}

export default ReviewSegment
