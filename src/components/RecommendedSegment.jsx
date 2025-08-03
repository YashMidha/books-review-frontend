import React, { useEffect, useState } from 'react'
import RecommendedCard from './RecommendedCard'
import RecommendedCardSkeleton from './RecommendedCardSkeleton'
import books from '@/assets/details'

const RecommendedSegment = ({ title, bookId, authorId, baseLoading, booksData }) => {

    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        setLoading(true); 
        setTimeout(() => {
            if (booksData) {
                setRecommendations(booksData);
            } else if (bookId) {
                setRecommendations(books);
            } else if (authorId) {
                setRecommendations(books);
            }
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>

            {loading || baseLoading ?

                (<div className='flex gap-4 overflow-x-auto pb-2 no-scrollbar'>
                    {Array.from({ length: 5 }).map((_, idx) => <RecommendedCardSkeleton key={idx} />)}
                </div>)
                :
                (recommendations && recommendations.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {recommendations.map(book => (
                            <RecommendedCard key={book.isbn} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm italic">No recommendations available.</p>
                ))
            }

        </div>
    )
}

export default RecommendedSegment
