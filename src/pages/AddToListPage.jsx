import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import RefineAIModel from '@/components/RefineAIModel';
import {
  addBookToUser,
  checkUserBookStatus,
  deleteBookFromUser,
  getUserBookReview
} from '@/services/userService';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { getBookByISBN } from '@/services/bookService';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

const AddToListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(true);

  const [status, setStatus] = useState('planToRead');
  const [rating, setRating] = useState(0);
  const [pagesRead, setPagesRead] = useState('');
  const [review, setReview] = useState('');

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      setLoadingBook(true);
      try {
        const data = await getBookByISBN(id);
        setBook(data.book);
      } catch (error) {
        toast.error('Failed to fetch book details.');
        console.error(error);
        setError('Failed to fetch book details.');
      } finally {
        setLoadingBook(false);
      }
    }

    fetchBook();
  }, [id]);

  useEffect(() => {
    if (!book) return;

    async function fetchUserBookData() {
      setLoading(true);
      try {
        const statusRes = await checkUserBookStatus(id);
        if (statusRes.alreadyAdded) {
          setAlreadyAdded(true);
          setStatus(statusRes.status);

          const reviewRes = await getUserBookReview(id);
          if (reviewRes.exists) {
            setRating(reviewRes.rating || 0);
            setReview(reviewRes.review || '');
            setPagesRead(reviewRes.pagesRead !== undefined ? reviewRes.pagesRead.toString() : '');
          } else {
            setRating(0);
            setReview('');
            setPagesRead('');
          }
        } else {
          setAlreadyAdded(false);
          setStatus('planToRead');
          setRating(0);
          setReview('');
          setPagesRead('0');
        }
      } catch (error) {
        toast.error('Failed to load your book data.');
        console.error(error);
        setError('Failed to load your book data.')
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    }

    fetchUserBookData();
  }, [book, id]);

  useEffect(() => {
    if (initialLoad) return;

    if (status === 'planToRead') {
      setPagesRead('0');
    } else if (status === 'completed') {
      setPagesRead(book?.pageCount?.toString() || '0');
    }
  }, [status, book, initialLoad]);

  const handleRating = (idx) => {
    if (rating === idx) {
      setRating(0);
    } else {
      setRating(idx);
    }
  };

  const handleSubmit = async () => {
    const pagesNum = Number(pagesRead);
    if (pagesNum < 0 || pagesNum > (book?.pageCount || 0)) {
      toast.error(`Please enter pages between 0 and ${book.pageCount}`);
      return;
    }

    setLoading(true);
    try {
      await addBookToUser({
        isbn: id,
        status,
        pages: pagesNum,
        rating,
        review,
      });
      toast.success(`Updated '${book.title}' in your list!`);
      navigate(-1);
    } catch (error) {
      toast.error('Failed to update book.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBookFromUser(id);
      toast.success(`Removed '${book.title}' from your list.`);
      navigate(-1);
    } catch (error) {
      toast.error('Failed to delete book.');
      console.error(error);
    } finally {
      setIsDeleting(false);
      setOpenConfirm(false);
    }
  };

  if (loadingBook) {
    return (
      <Loading />
    );
  }

  if (!book) {
    return (
      <div className="p-10 text-center text-red-500 text-lg font-semibold">
        Book not found.
      </div>
    );
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  return initialLoad ?
    (<Loading />)
    : (
      <div className="max-w-2xl mx-auto py-10 px-6 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>

        <div className="space-y-6">
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planToRead">Plan to Read</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Pages Read</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                type="number"
                min={0}
                max={book.pageCount}
                value={pagesRead}
                onChange={(e) => setPagesRead(e.target.value)}
                className="w-24"
                placeholder="0"
              />
              <span className="text-gray-500">/ {book.pageCount} pages</span>
            </div>
          </div>

          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer transition ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  onClick={() => handleRating(i)}
                />
              ))}
            </div>
          </div>

          <div>
            <Label>Review</Label>
            <Textarea
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="h-[180px] overflow-scroll no-scrollbar w-full mt-2"
            />
            {review && (
              <div className="flex justify-end mt-1">
                <RefineAIModel title={book.title} prevReview={review} setPrevReview={setReview} />
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-3">
            <Button variant="ghost" onClick={() => navigate(-1)} disabled={loading || isDeleting}>
              Cancel
            </Button>

            {alreadyAdded && (
              <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <DialogTrigger asChild>
                  <Button className='mr-auto' variant="destructive" disabled={isDeleting}>
                    Delete
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove this book from your list? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="space-x-2">
                    <Button variant="outline" onClick={() => setOpenConfirm(false)} disabled={isDeleting}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <Button onClick={handleSubmit} disabled={loading || isDeleting}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Saving...
                </span>
              ) : (
                alreadyAdded ? 'Update' : 'Save'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
};

export default AddToListPage;
