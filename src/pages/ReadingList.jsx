import React, { useEffect, useState } from 'react';
import BookList from '@/components/BookList';
import { getReading } from '@/services/userService';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

const ReadingList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReading = async () => {
      setLoading(true);
      try {
        const data = await getReading();
        setBooks(data.reading || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load reading list');
      } finally {
        setLoading(false);
      }
    };

    fetchReading();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return <BookList books={books} listType="reading" />;
};

export default ReadingList;
