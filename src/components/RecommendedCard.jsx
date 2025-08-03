import React from 'react'
import { Link } from 'react-router-dom'

const RecommendedCard = ({ book }) => {
  return (
    <Link to={`/book/${book.isbn}`} className="shrink-0 relative w-38 sm:w-50 block rounded-md overflow-hidden shadow hover:shadow-lg transition group">
      <img
        src={book.imageUrlL}
        alt={book.bookTitle}
        loading="lazy"
        className="w-full h-55 sm:h-75 object-cover group-hover:brightness-90 transition duration-200"
      />
      <div className="absolute bottom-0 w-full text-white px-2 py-1 text-lg text-center text-stroke font-bold line-clamp-2">
        {book.bookTitle}
      </div>
    </Link>
  )
}

export default RecommendedCard
