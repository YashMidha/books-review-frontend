import React, { useEffect, useState } from 'react';
import BookList from '@/components/BookList';
import { getAllBooks } from '@/services/userService';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

const AllBooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const allBooks = await getAllBooks();
        setBooks(allBooks);
      } catch (err) {
        console.error(err);
        setError('Failed to load all books');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return <BookList books={books} listType="all" />;
};

export default AllBooksList;
