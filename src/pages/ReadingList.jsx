import React from 'react'
import userData from '@/assets/user';
import BookList from '@/components/BookList';

const ReadingList = () => {
  return (
    <BookList books={userData.lists.reading} listType="reading" />
  );
}

export default ReadingList