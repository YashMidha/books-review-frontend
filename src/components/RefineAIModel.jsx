import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from './ui/textarea';
import { Loader2 } from 'lucide-react'; 
import { enhanceReview } from '@/services/userService';

const RefineAIModel = ({title, prevReview, setPrevReview }) => {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const refineReviewWithAI = async (rawText) => {
    setLoading(true);
    try {
      const data = await enhanceReview({review: rawText, bookTitle: title});
      return data.enhancedReview;
    } catch (err) {
      console.error("AI refinement failed", err);
      return rawText;
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async () => {
    setReview(prevReview || '');
    const refined = await refineReviewWithAI(prevReview || '');
    setReview(refined);
  };

  return (
    <Dialog onOpenChange={(open) => open && handleOpen()}>
      <DialogTrigger asChild>
        <Button
        variant="ghost"
        className="cursor-pointer font-semibold text-blue-500 hover:text-blue-600 hover:bg-transparent"
        >
            Refine
        </Button>



      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Refine</DialogTitle>
          <DialogDescription>Refining the review using AI</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center h-[180px]">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            <span className="ml-2 text-gray-500">Refining...</span>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="review-dialog">Review</Label>
              <Textarea
                id="review-dialog"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="h-[180px] overflow-scroll no-scrollbar w-full"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => setPrevReview(review.trim())}
              disabled={loading || review?.trim() === prevReview?.trim()}
            >
              Apply changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RefineAIModel;
