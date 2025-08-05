import React from 'react';
import userData from '@/assets/user';
import BookList from '@/components/BookList';

const AllBooksList = () => {
  const allBooks = [
    ...userData.lists.reading.map(book => ({ ...book, sourceList: 'reading' })),
    ...userData.lists.completed.map(book => ({ ...book, sourceList: 'completed' })),
    ...userData.lists.planned.map(book => ({ ...book, sourceList: 'planned' })),
  ];

  return (
    <BookList books={allBooks} listType="all" />
  );
};

export default AllBooksList;
