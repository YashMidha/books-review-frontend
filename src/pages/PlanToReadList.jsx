import React, { useEffect, useState } from 'react';
import BookList from '@/components/BookList';
import { getPlanned } from '@/services/userService';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

const PlanToReadList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanned = async () => {
      setLoading(true);
      try {
        const data = await getPlanned();
        setBooks(data.planToRead || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load planned list');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanned();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return <BookList books={books} listType="planned" />;
};

export default PlanToReadList;
