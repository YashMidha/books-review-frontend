import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent
} from '@/components/ui/card'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom';

const SearchCard = ({ book }) => {
  return (
    <Card className="shadow-sm border border-gray-200 hover:shadow-lg transition duration-300">
      <CardHeader>
        <Link to={`/book/${book.isbn}`}>
          <CardTitle className="text-lg font-semibold">{book.bookTitle}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground">
          <div className='flex justify-between'> 
            <p className="text-gray-600 text-md italic">by {book.bookAuthor || 'N/A'}</p>
            <div className="flex items-center gap-2 text-yellow-500 text-md">
              <Star className="w-4 h-4 fill-yellow-500" />
              {book.avgRating || 'N/A'} <span className="text-gray-500 text-sm">({book.ratingsCount || 'N/A'})</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <hr className="my-2 border-t border-gray-200" />
      <CardContent>
        <div className="flex gap-4 items-start">
           <div className="shrink-0 w-24">
            <Link to={`/book/${book.isbn}`}>
              <img
                src={book.imageUrlM}
                alt={book.bookTitle}
                className="w-full h-auto rounded-md object-cover"
                loading='lazy'
              />
            </Link>
          </div>
          <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed">
            {book.description || 'N/A'}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">Published: {book.yearOfPublication || 'N/A'}</p>
      </CardFooter>
    </Card>
  )
}

export default SearchCard
