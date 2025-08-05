import React from 'react'
import userData from '@/assets/user';
import BookList from '@/components/BookList';

const PlanToReadList = () => {
  return (
    <BookList books={userData.lists.planned} listType="planned" />
  );
}

export default PlanToReadList