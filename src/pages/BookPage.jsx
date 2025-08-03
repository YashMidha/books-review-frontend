import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import books from '@/assets/details'
import { Star, PlusCircle, Share2, ChevronUp, ChevronDown } from 'lucide-react'
import RecommendedSegment from '@/components/RecommendedSegment'
import ReviewSegment from '@/components/ReviewSegment'
import { toast } from 'react-toastify';
import BookPageSkeleton from '@/components/BookPageSkeleton'
import { useNavigate  } from 'react-router-dom'

const BookPage = () => {
    const { id } = useParams()
    const book = books.find(book => book.isbn === id)
    const [detailsDrawer, setDetailsDrawer] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = function () {
        const val = detailsDrawer
        setDetailsDrawer(!val)
    }

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

    useEffect(()=>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold">Book not found</h2>
            </div>
        )
    }

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, [id]);

    return (
        loading ? (<BookPageSkeleton />):(
        <div className="container mx-auto px-4 sm:px-8 md:px-12 py-10 space-y-12 overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:items-start gap-10">

                <div className="w-full flex flex-col items-center lg:items-start mx-auto gap-5 max-w-[260px]">
                    <img
                        src={book.imageUrlL}
                        alt={book.bookTitle}
                        className="w-full h-auto rounded-md shadow border border-gray-200"
                    />

                    <div className="flex flex-wrap gap-3 flex-col w-full">
                        <button onClick={()=>navigate(`/book/${book.isbn}/add`)} className="justify-center cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition">
                            <PlusCircle className="w-5 h-5" />
                            Add to List
                        </button>

                        <button onClick={() => handleShare(book.isbn)} className="justify-center cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 shadow-sm transition">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>

                        <button onClick={toggleDrawer} className='justify-center md:hidden cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-sm transition'>
                            {detailsDrawer
                                ? <ChevronDown className='w-5 h-5' />
                                : <ChevronUp className='w-5 h-5' />
                            }
                            Details
                        </button>
                    </div>

                    <div className={`grid grid-cols-1 gap-2 text-sm text-gray-700 w-full break-words ${detailsDrawer ? 'block' : 'hidden'} md:block`}>
                        <div><span className="font-semibold">Publisher:</span> {book.publisher || 'N/A'}</div>
                        <div><span className="font-semibold">Year:</span> {book.yearOfPublication || 'N/A'}</div>
                        <div><span className="font-semibold">Language:</span> {book.language || 'N/A'}</div>
                        <div><span className="font-semibold">Genre:</span> {book.genre || 'N/A'}</div>
                        <div><span className="font-semibold">Pages:</span> {book.pages || 'N/A'}</div>
                        <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-4 flex-1 space-y-6 break-words overflow-x-hidden text-center lg:text-left mx-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{book.bookTitle}</h1>
                        <p className="text-gray-600 text-md mt-1 italic">by {book.bookAuthor || 'N/A'}</p>
                    </div>

                    <div className="flex items-center gap-2 text-yellow-500 text-lg lg:justify-start justify-center">
                        <Star className="w-5 h-5 fill-yellow-500" />
                        {book.avgRating || 'N/A'}{' '}
                        <span className="text-gray-500 text-sm">({book.ratingsCount || 'N/A'})</span>
                    </div>

                    <p className="text-gray-800 text-[1.05rem] leading-relaxed tracking-wide break-words text-justify">
                        {book.description || 'N/A'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-sm text-gray-700 text-left">
                        <div><span className="font-semibold">Publisher:</span> {book.publisher || 'N/A'}</div>
                        <div><span className="font-semibold">Year:</span> {book.yearOfPublication || 'N/A'}</div>
                        <div><span className="font-semibold">Language:</span> {book.language || 'N/A'}</div>
                        <div><span className="font-semibold">Genre:</span> {book.genre || 'N/A'}</div>
                        <div><span className="font-semibold">Pages:</span> {book.pages || 'N/A'}</div>
                        <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>
                    </div>

                    <hr className="border-t" />
                    <RecommendedSegment title="You may also like" bookId={book.isbn} />
                    <hr className="border-t" />
                    <RecommendedSegment title="More by this author" authorId={book.bookAuthor} />
                    <hr className="border-t" />
                    <ReviewSegment bookId={book.isbn} />
                </div>
            </div>
        </div>
    ))
}

export default BookPage
