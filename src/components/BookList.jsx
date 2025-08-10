import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Pencil, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import clsx from 'clsx';
import SafeImage from './SafeImage';
import { useNavigate } from 'react-router-dom';

const listColorMap = {
  reading: 'border-l-4 border-green-500',
  completed: 'border-l-4 border-blue-500',
  planned: 'border-l-4 border-gray-400',
  all: '',
};

const BookList = ({ books = [], listType }) => {

  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('title');

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'avgRating') return (b.avgRating || 0) - (a.avgRating || 0);
      if (sortBy === 'totalRatings') return (b.totalRatings || 0) - (a.totalRatings || 0);
      return 0;
    });
  }, [books, sortBy]);

  const getColorClass = (book) => {
    const type = listType === 'all' ? book.sourceList : listType;
    return listColorMap[type] || '';
  };

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <div className="p-4 space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">{listType} List</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="rating">My Rating</SelectItem>
            <SelectItem value="avgRating">Average Rating</SelectItem>
            <SelectItem value="totalRatings">Total Ratings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-auto rounded-md border hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>#</TableHead>
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBooks.map((book, index) => (
              <TableRow key={`${book._id}-${index}`}>
                <TableCell className={getColorClass(book)} />
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <SafeImage onClick={() => {navigate(`/book/${book.isbn}`)}} srcList={[book.imageLinks.medium, book.imageLinks.thumbnail].filter(Boolean)} alt={book.title} className="w-14 h-20 object-cover rounded cursor-pointer" />
                </TableCell>
                <TableCell>
                  <div onClick={()=>navigate(`/book/${book.isbn}`)} className="font-medium cursor-pointer">{book.title}</div>
                  <div className="text-sm text-muted-foreground">{book.authors}</div>
                </TableCell>
                <TableCell>
                  {book.pagesRead ?  book.pagesRead : 0}
                </TableCell>
                <TableCell>
                  {book.rating ? (
                    <span className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" /> {book.rating}
                    </span>
                  ) : (
                    <span className="italic text-muted-foreground text-sm"><Minus className='w-3 h-3 text-black' /></span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    onClick={() => navigate(`/book/${book.isbn}/add`)}
                    className='bg-green-500 hover:bg-green-600 text-white'
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {/* <Button onClick={()=>navigate(`/book/${book.isbn}/add`)} variant="outline" size="sm">
                    Update
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="block sm:hidden space-y-3">
        {sortedBooks.map((book, index) => {
          const colorBar = getColorClass(book);
          return (
            <div
              key={`${book._id}-${index}`}
              className={clsx(
                'flex items-start gap-3 border rounded-md p-4 relative shadow-sm',
                colorBar
              )}
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-l-md" />
              <SafeImage onClick={() => {navigate(`/book/${book.isbn}`)}}  srcList={[book.imageLinks.medium, book.imageLinks.thumbnail].filter(Boolean)} alt={book.title} className="w-16 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">{book.title}</h3>
                  <span className="text-muted-foreground text-sm">#{index + 1}</span>
                </div>
                <p className="text-sm mt-1">
                  {book.pagesRead ?  book.pagesRead : 0}
                </p>
                <div className="flex justify-between items-center mt-2">
                  {book.rating ? (
                    <span className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      {book.rating}
                    </span>
                  ) : (
                    <span className="italic text-muted-foreground text-sm"><Minus className='w-3 h-3 text-black' /></span>
                  )}
                  {/* <Button onClick={()=>navigate(`/book/${book.isbn}/add`)} variant="outline" size="sm">
                    Update
                  </Button> */}
                  <Button
                    size="icon"
                    onClick={() => navigate(`/book/${book.isbn}/add`)}
                    className='bg-green-500 hover:bg-green-600 text-white'
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
