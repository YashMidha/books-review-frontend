import React, { useEffect, useState } from 'react';
import BookList from '@/components/BookList';
import { getCompleted } from '@/services/userService';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

const CompletedList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompleted = async () => {
      setLoading(true);
      try {
        const data = await getCompleted();
        setBooks(data.completed || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load completed list');
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return <BookList books={books} listType="completed" />;
};

export default CompletedList;
