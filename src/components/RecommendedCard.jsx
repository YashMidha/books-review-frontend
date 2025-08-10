import React from 'react'
import { Link } from 'react-router-dom'
import SafeImage from '@/components/SafeImage.jsx';

const RecommendedCard = ({ book }) => {
  return (
    <Link to={`/book/${book.isbn}`} className="shrink-0 relative w-38 sm:w-50 block rounded-md overflow-hidden shadow hover:shadow-lg transition group">
      <SafeImage
        srcList={[book.imageLinks?.medium, book.imageLinks?.thumbnail].filter(Boolean)}
        alt={book.title}
        className="w-full h-55 sm:h-75 object-cover group-hover:brightness-90 transition duration-200"
      />
      <div className="absolute bottom-0 w-full px-3 py-2 text-white bg-rose-400/50 backdrop-blur-sm text-lg font-semibold line-clamp-2">
        {book.title}
      </div>

    </Link>
  )
}

export default RecommendedCard
