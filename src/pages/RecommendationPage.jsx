import React, { useEffect, useState } from 'react';
import RecommendedSegment from '@/components/RecommendedSegment';
import RecommendedCardSkeleton from '@/components/RecommendedCardSkeleton';
import { Button } from '@/components/ui/button';
import books from '@/assets/details';

const RecommendationPage = () => {
  const [popular, setPopular] = useState([]);
  const [likedBasedOn, setLikedBasedOn] = useState([]);
  const [readBasedOn, setReadBasedOn] = useState([]);

  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingLiked, setLoadingLiked] = useState(true);
  const [loadingRead, setLoadingRead] = useState(true);

  const [triggerReload, setTriggerReload] = useState(0);

  const getRandomBooks = (startMin, startMax, lengthMin = 5, lengthMax = 10) => {
    const start = Math.floor(Math.random() * (startMax - startMin + 1)) + startMin;
    const length = Math.floor(Math.random() * (lengthMax - lengthMin + 1)) + lengthMin;
    return books.slice(start, start + length);
  };

  useEffect(() => {
    setLoadingPopular(true);
    setLoadingLiked(true);
    setLoadingRead(true);

    setTimeout(()=>{

    setPopular(books);
    setLoadingPopular(false);

    setLikedBasedOn([
      {
        baseBook: { title: 'The Da Vinci Code' },
        recommendations: getRandomBooks(5, 15),
      },
      {
        baseBook: { title: 'The Alchemist' },
        recommendations: getRandomBooks(10, 20),
      },
    ]);
    setLoadingLiked(false);

    setReadBasedOn([
      {
        baseBook: { title: '1984' },
        recommendations: getRandomBooks(8, 18),
      },
      {
        baseBook: { title: 'To Kill a Mockingbird' },
        recommendations: getRandomBooks(12, 22),
      },
    ]);
    setLoadingRead(false);
    }, 1000)
  }, []);


  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Recommended for You</h1>

      <RecommendedSegment
        title="Popular Books"
        booksData={popular}
        loading={loadingPopular}
      />

      {likedBasedOn.map((group, idx) => (
        <RecommendedSegment
          key={`liked-${idx}`}
          title={`Since you liked '${group.baseBook.title}'`}
          booksData={group.recommendations}
          loading={loadingLiked}
        />
      ))}

      {readBasedOn.map((group, idx) => (
        <RecommendedSegment
          key={`read-${idx}`}
          title={`Because you read '${group.baseBook.title}'`}
          booksData={group.recommendations}
          loading={loadingRead}
        />
      ))}

      <div className="flex justify-center mt-12">
        {!loadingRead && !loadingLiked && !loadingPopular && 
          <Button
            variant="outline"
            onClick={() => setTriggerReload(prev => prev + 1)}
            className="cursor-pointer"
          >
            Reload Recommendations
          </Button>
        }
      </div>
    </div>
  );
};

export default RecommendationPage;
