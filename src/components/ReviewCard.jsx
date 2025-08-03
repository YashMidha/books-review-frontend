import React from 'react'
import { Star } from 'lucide-react'

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white space-y-4 overflow-hidden">
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div className="w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={review.userImg}
            alt={review.user}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{review.user}</h3>
            <p className="text-sm text-gray-500 whitespace-nowrap">{review.date}</p>
          </div>

          <div className="flex items-center text-yellow-500 gap-1 text-sm mt-1">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="font-medium">{review.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed break-words text-left">
        {review.text}
      </p>
    </div>
  )
}

export default ReviewCard
