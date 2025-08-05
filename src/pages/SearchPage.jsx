import React, { useState, useEffect } from 'react'
import staticBooks from '@/assets/details'
import SearchCard from '@/components/SearchCard'
import SearchCardSkeleton from '@/components/SearchCardSkeleton';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const SearchPage = () => {
  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [limit, setLimit] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);

      window.scrollTo({ top: 0, behavior: 'smooth' }); 

      setTimeout(() => {
        setBooks(staticBooks.slice((page - 1) * limit, page * limit)); 
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTotalPages(Math.ceil(staticBooks.length/limit));
      setBooks(staticBooks.slice(0, limit));
      setLoading(false);
    }, 500);
  }, []);

  return (
    
    <div className="max-w-screen-xl container mx-auto px-4 sm:px-8 md:px-12 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Explore Books</h1>
      
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit} className="flex w-full sm:w-100">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition cursor-pointer"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, id) => <SearchCardSkeleton key={id} />)
        ) : books.length > 0 ? (
          books.map((book) => <SearchCard key={book.isbn} book={book} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg mt-4">
            No books found!
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious
                  className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => handlePageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      )}


    </div>
  )
}

export default SearchPage
