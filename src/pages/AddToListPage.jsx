import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import books from '@/assets/details';
import { Loader2 } from 'lucide-react';
import RefineAIModel from '@/components/RefineAIModel';

const AddToListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b.isbn === id);

  const [status, setStatus] = useState('want-to-read');
  const [rating, setRating] = useState(0);
  const [pagesRead, setPagesRead] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  if (!book) {
    return <div className="p-10 text-center text-red-500 text-lg font-semibold">Book not found.</div>;
  }

  const handleRating = (idx) => {
    if (rating === idx){
      setRating(0);
    }
    else{
      setRating(idx);
    }
  }

  const handleSubmit = async () => {
    if (pagesRead < 0 || pagesRead > book.pages) {
      toast.error(`Please enter pages between 0 and ${book.pages}`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log({ book, status, rating, pagesRead, review });
      toast.success(`Updated '${book.bookTitle}' to your list!`);
      setLoading(false);
      navigate(-1);
    }, 1500);
  };

  useEffect(() => {
    if (!book) return;

    if (status === 'want-to-read'){
      setPagesRead(0);
    }
    else if (status === 'completed'){
      setPagesRead(book.pages || 0);
    }

  }, [status, book]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{book.bookTitle}</h1>

      <div className="space-y-6">
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="want-to-read">Want to Read</SelectItem>
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
              max={book.pages}
              value={pagesRead}
              onChange={(e) => setPagesRead(e.target.value)}
              className="w-24"
              placeholder="0"
            />
            <span className="text-gray-500">/ {book.pages} pages</span>
          </div>
        </div>

        <div>
          <Label>Rating</Label>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer transition ${
                  i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
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
              <RefineAIModel prevReview={review} setPrevReview={setReview} />
            </div>
          )}
        </div>



        <div className="flex gap-4 justify-end pt-3">
          <Button className='cursor-pointer' variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          <Button className='cursor-pointer' onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Saving...
              </span>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToListPage;
