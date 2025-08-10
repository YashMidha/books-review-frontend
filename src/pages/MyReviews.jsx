import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Star, Pencil } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { useNavigate } from "react-router-dom";
import { getUserReviews } from "@/services/userService";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";

const MyReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchReviews = async () => {
      try {
        const data = await getUserReviews();
        console.log(data);
        setReviews(data.reviews);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching reviews");
        setError("Error fetching reviews")
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <Loading />
  if (error) return <ErrorComponent error={error} />
  if (!reviews.length) return <div className="p-4 text-muted-foreground">No reviews found.</div>;

  return (
    <div className="p-4 space-y-4 w-full">
      <h2 className="text-xl font-semibold">My Reviews</h2>

      <div className="space-y-4">
        {reviews.map((r, index) => (
          <div
            key={`${r.book._id}-${index}`}
            className="flex items-start gap-4 border rounded-md p-4 shadow-sm"
          >
            <SafeImage
              onClick={() => navigate(`/book/${r.book.isbn}`)}
              srcList={[r.book.imageLinks?.medium, r.book.imageLinks?.thumbnail].filter(Boolean)}
              alt={r.bookTitle}
              className="w-20 h-28 object-cover rounded cursor-pointer"
            />

            <div className="flex-1 space-y-1">
              <h3
                className="font-semibold cursor-pointer"
                onClick={() => navigate(`/book/${r.book.isbn}`)}
              >
                {r.book.title}
              </h3>

              {r.rating ? (
                <span className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" /> {r.rating}
                </span>
              ) : (
                <Minus className="w-3 h-3 text-muted-foreground" />
              )}

              {r.review && (
                <p className="text-sm text-muted-foreground">{r.review}</p>
              )}
            </div>

            <Button
              size="icon"
              onClick={() => navigate(`/book/${r.book.isbn}/add`)}
              className='bg-green-500 hover:bg-green-600 text-white'
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
