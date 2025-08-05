import React from 'react'
import userData from '@/assets/user';
import BookList from '@/components/BookList';

const CompletedList = () => {
  return (
    <BookList books={userData.lists.completed} listType="completed" />
  );
}

export default CompletedList