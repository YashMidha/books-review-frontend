import React, { use, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, PlusCircle, Share2, ChevronUp, ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify';
import RecommendationSegment from '@/components/RecommendationSegment';
import RecommendationSegmentSkeleton from '@/components/RecommendationSegmentSkeleton';
import ReviewSegment from '@/components/ReviewSegment'
import ReviewSegmentSkeleton from '@/components/ReviewSegmentSkeleton';
import BookPageSkeleton from '@/components/BookPageSkeleton'
import { getBookByISBN, getBookRecommendation, getBookReviews, getBooksByAuthor } from '@/services/bookService';
import SafeImage from '@/components/SafeImage';
import ErrorComponent from '@/components/ErrorComponent';
import { checkUserBookStatus, getUserBookReview } from '@/services/userService';

const BookPage = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [detailsDrawer, setDetailsDrawer] = useState(false);

    const [loadingBook, setLoadingBook] = useState(true);
    const [loadingRecommendations, setLoadingRecommendations] = useState(true);
    const [loadingAuthorBooks, setLoadingAuthorBooks] = useState(true);
    // const [loadingReviews, setLoadingReviews] = useState(true);

    const [recommendations, setRecommendations] = useState([]);
    const [authorBooks, setAuthorBooks] = useState([]);
    // const [reviews, setReviews] = useState([]);

    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [userPagesRead, setUserPagesRead] = useState(0);

    const [error, setError] = useState(null);

    const toggleDrawer = () => setDetailsDrawer((prev) => !prev);

    const handleShare = async (isbn) => {
        const shareUrl = `${window.location.origin}/book/${isbn}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
        } catch (e) {
            console.error(e);
            toast.error("Failed to copy link.");
        }
    }

    useEffect(() => {
        const fetchBook = async () => {
            setLoadingBook(true);
            try {
                const data = await getBookByISBN(id)
                setBook(data.book || null)

                if (data.book) {
                    const statusRes = await checkUserBookStatus(id)
                    if (statusRes.alreadyAdded) {
                        setAlreadyAdded(true)
                        setUserStatus(statusRes.status)

                        const reviewRes = await getUserBookReview(id)
                        if (reviewRes.exists) {
                            setUserRating(reviewRes.rating || 0)
                            setUserPagesRead(reviewRes.pagesRead || 0)
                        } else {
                            setUserRating(0)
                            setUserPagesRead(0)
                        }
                    } else {
                        setAlreadyAdded(false)
                        setUserStatus('')
                        setUserRating(0)
                        setUserPagesRead(0)
                    }
                }
            } catch (err) {
                console.err(err);
                toast.error('Failed to load book details.');
                setBook(null);
                setError('Failed to load book details.')
            } finally {
                setLoadingBook(false);
            }
        }
        fetchBook();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        if (!book) return;

        const fetchRecommendations = async () => {
            setLoadingRecommendations(true);
            try {
                const data = await getBookRecommendation(book.isbn);
                setRecommendations(data.recommendations);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load recommendations.');
                setRecommendations([]);
            } finally {
                setLoadingRecommendations(false);
            }
        };

        const fetchAuthorBooks = async () => {
            setLoadingAuthorBooks(true);
            try {
                const data = await getBooksByAuthor(book.isbn);
                setAuthorBooks(data.books);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load author books.');
                setAuthorBooks([]);
            } finally {
                setLoadingAuthorBooks(false);
            }
        };

        fetchRecommendations();
        fetchAuthorBooks();
    }, [book]);

    // useEffect(() => {
    //     if (!book) return;

    //     const fetchReviews = async () => {
    //         setLoadingReviews(true);
    //         try {
    //             const data = await getBookReviews(book.isbn, 1);
    //             setReviews(data);
    //         } catch (err) {
    //             console.error(err);
    //             toast.error('Failed to load reviews.');
    //             setReviews([]);
    //         } finally {
    //             setLoadingReviews(false);
    //         }
    //     };

    //     fetchReviews();
    // }, [book]);


    if (loadingBook) return <BookPageSkeleton />;

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold">Book not found</h2>
            </div>
        )
    }

    if (error) {
        return (
            <ErrorComponent error={error} />
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 md:px-12 py-10 space-y-12 overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:items-start gap-10">

                <div className="w-full flex flex-col items-center lg:items-start mx-auto gap-5 max-w-[260px]">
                    <SafeImage
                        srcList={[book.imageLinks?.large, book.imageLinks?.thumbnail].filter(Boolean)}
                        alt={book.title}
                        className="w-full h-auto rounded-md shadow border border-gray-200"
                    />

                    {alreadyAdded && (
                        <div className="bg-green-50 border border-green-400 rounded-md p-4 w-full space-y-3 text-gray-800">
                            <div><span className="font-semibold">My Status:</span> {userStatus}</div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">My Rating:</span>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <div><span className="font-semibold">Pages Read:</span> {userPagesRead}</div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 flex-col w-full">
                        <button
                            onClick={() => navigate(`/book/${book.isbn}/add`)}
                            className={`justify-center cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md shadow-sm transition
                            ${alreadyAdded ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            <PlusCircle className="w-5 h-5" />
                            {alreadyAdded ? 'Update' : 'Add to List'}
                        </button>

                        <button
                            onClick={() => handleShare(book.isbn)}
                            className="justify-center cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 shadow-sm transition"
                        >
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>

                        <button
                            onClick={toggleDrawer}
                            className="justify-center md:hidden cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-sm transition"
                        >
                            {detailsDrawer ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                            Details
                        </button>
                    </div>

                    <div className={`grid grid-cols-1 gap-2 text-sm text-gray-700 w-full break-words ${detailsDrawer ? 'block' : 'hidden'} md:block`}>
                        <div><span className="font-semibold">Publisher:</span> {book.publisher || 'N/A'}</div>
                        <div><span className="font-semibold">Year:</span> {book.publishedDate || 'N/A'}</div>
                        <div><span className="font-semibold">Author:</span> {book.authors || 'N/A'}</div>
                        <div><span className="font-semibold">Language:</span> {book.language || 'N/A'}</div>
                        <div><span className="font-semibold">Genre:</span> {book.genre || 'N/A'}</div>
                        <div><span className="font-semibold">Pages:</span> {book.pageCount || 'N/A'}</div>
                        <div><span className="font-semibold">Average Rating:</span> {book.avgRating || 'N/A'}</div>
                        <div><span className="font-semibold">Total Ratings:</span> {book.totalRatings || 'N/A'}</div>
                        <div><span className="font-semibold">Print Type:</span> {book.printType || 'N/A'}</div>
                        <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>
                    </div>
                </div>



                <div className="md:col-span-2 lg:col-span-4 flex-1 space-y-6 break-words overflow-x-hidden text-center lg:text-left mx-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                        <p className="text-gray-600 text-md mt-1 italic">by {book.authors || 'N/A'}</p>
                    </div>

                    <div className="flex items-center gap-2 text-yellow-500 text-lg lg:justify-start justify-center">
                        <Star className="w-5 h-5 fill-yellow-500" />
                        {book.avgRating || 'N/A'}{' '}
                        <span className="text-gray-500 text-sm">({book.totalRatings || 'N/A'})</span>
                    </div>

                    <p className="text-gray-800 text-[1.05rem] leading-relaxed tracking-wide break-words text-justify">
                        {book.description || 'N/A'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-sm text-gray-700 text-left">
                        <div><span className="font-semibold">Publisher:</span> {book.publisher || 'N/A'}</div>
                        <div><span className="font-semibold">Year:</span> {book.publishedDate || 'N/A'}</div>
                        <div><span className="font-semibold">Language:</span> {book.language || 'N/A'}</div>
                        <div><span className="font-semibold">Genre:</span> {book.genre || 'N/A'}</div>
                        <div><span className="font-semibold">Pages:</span> {book.pageCount || 'N/A'}</div>
                        <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>
                    </div>

                    <hr className="border-t" />
                    <RecommendationSegment title="You may also like" booksData={recommendations} loading={loadingRecommendations} />

                    <hr className="border-t" />
                    <RecommendationSegment title="More by this author" booksData={authorBooks} loading={loadingAuthorBooks} />


                    <hr className="border-t" />
                    <ReviewSegment bookId={book.isbn} />
                </div>
            </div>
        </div>
    )
}

export default BookPage
