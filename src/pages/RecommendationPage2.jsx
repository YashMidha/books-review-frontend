import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import books from '@/assets/details';
import RecommendationSegment from '@/components/RecommendationSegment';
import RecommendationSegmentSkeleton from '@/components/RecommendationSegmentSkeleton';
import { getUserRecommendations } from '@/services/userService';
import ErrorComponent from '@/components/ErrorComponent';

const RecommendationPage2 = () => {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getUserRecommendations(currentPage);
      setCurrentPage(prev => prev + 1);
      setItems(prevItems => [
        ...prevItems,
        ...data.personalizedRecommendations
      ]);
    } catch (err) {
      console.error(err);
    }
  };

   useEffect(() => {
    const fetchFirstPage = async () => {
      try {
        const firstPage = await getUserRecommendations(1);
        setTotalPages(firstPage.totalPages);
        setItems(firstPage.personalizedRecommendations)
        setCurrentPage(2);
      } catch (err) {
        console.error(err);
        setError("Error loading initial recommendations");
      }
    };
    fetchFirstPage();
  }, []);

  if (error){
    return <ErrorComponent error={error} />
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Recommended For You</h1>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={currentPage <= totalPages}
        loader={<RecommendationSegmentSkeleton />}
        endMessage={
          <p className="text-center text-sm text-gray-500 py-4">
            <b>Add more books to get more recommendations</b>
          </p>
        }
      >
        <div className="flex flex-col gap-6 mb-5">
          {items.map((item, idx) => (
            <RecommendationSegment
              key={idx}
              title={`Since you read ${item.title}`}
              booksData={item.recommendations}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecommendationPage2;
