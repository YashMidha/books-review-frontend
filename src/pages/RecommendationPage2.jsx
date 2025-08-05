import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import books from '@/assets/details';
import RecommendationSegment from '@/components/RecommendationSegment';
import RecommendationSegmentSkeleton from '@/components/RecommendationSegmentSkeleton';

const RecommendationPage2 = () => {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const fetchedData = {
      bookTitle: books[Math.floor(Math.random() * books.length)].bookTitle,
      books: books
    };

    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setItems(prevItems => [...prevItems, fetchedData]);
    }, 1000);
  };

  useEffect(() => {
    setTotalPages(3);
    setCurrentPage(1);
    const fetchedData = {
      bookTitle: books[Math.floor(Math.random() * books.length)].bookTitle,
      books: books
    };
    setItems(prevItems => [...prevItems, fetchedData]);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Recommended For You</h1>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={currentPage <= totalPages}
        loader={<RecommendationSegmentSkeleton />}
        endMessage={
          <p className="text-center text-sm text-gray-500 py-4">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-col gap-6 mb-5">
          {items.map((item, idx) => (
            <RecommendationSegment
              key={idx}
              title={`Since you read ${item.bookTitle}`}
              booksData={item.books}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecommendationPage2;
