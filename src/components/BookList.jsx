import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
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

const listColorMap = {
  reading: 'border-l-4 border-green-500',
  completed: 'border-l-4 border-blue-500',
  planned: 'border-l-4 border-gray-400',
  all: '',
};

const BookList = ({ books = [], listType }) => {
  const [sortBy, setSortBy] = useState('date');

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'date') return new Date(b.date || 0) - new Date(a.date || 0);
      return 0;
    });
  }, [books, sortBy]);

  const getColorClass = (book) => {
    const type = listType === 'all' ? book.sourceList : listType;
    return listColorMap[type] || '';
  };

  return (
    <div className="p-4 space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">{listType} List</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
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
              <TableRow key={`${book.id}-${index}`}>
                <TableCell className={getColorClass(book)} />
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded" />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-muted-foreground">{book.author}</div>
                </TableCell>
                <TableCell>
                  {book.progress ? `${book.progress}/${book.totalPages}` : book.totalPages}
                </TableCell>
                <TableCell>
                  {book.rating ? (
                    <span className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" /> {book.rating}
                    </span>
                  ) : (
                    <span className="italic text-muted-foreground text-sm">No rating</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
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
              key={`${book.id}-${index}`}
              className={clsx(
                'flex items-start gap-3 border rounded-md p-4 relative shadow-sm',
                colorBar
              )}
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-l-md" />
              <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">{book.title}</h3>
                  <span className="text-muted-foreground text-sm">#{index + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-sm mt-1">
                  {book.progress ? `${book.progress}/${book.totalPages} pages` : `${book.totalPages} pages`}
                </p>
                <div className="flex justify-between items-center mt-2">
                  {book.rating ? (
                    <span className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      {book.rating}
                    </span>
                  ) : (
                    <span className="italic text-muted-foreground text-sm">No rating</span>
                  )}
                  <Button variant="outline" size="sm">
                    Update
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
