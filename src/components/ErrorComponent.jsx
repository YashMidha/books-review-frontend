import React from 'react'
import { AlertCircle } from 'lucide-react'

const ErrorComponent = ({ error, onRetry }) => {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className="max-w-md w-full mx-auto p-6 bg-red-50 border border-red-300 rounded-md text-center flex flex-col items-center gap-4 shadow-sm">
        <AlertCircle className="w-12 h-12 text-red-600" />
        <p className="text-lg font-semibold text-red-700 break-words">{error || 'Something went wrong.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            aria-label="Retry"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorComponent
