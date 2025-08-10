import React, { useState, useEffect } from 'react'
import SearchCard from '@/components/SearchCard'
import SearchCardSkeleton from '@/components/SearchCardSkeleton';
import { Search } from 'lucide-react';
import Pagination from '@mui/material/Pagination';
import { getSearchResult } from '@/services/bookService';


const SearchPage = () => {
  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [msg, setMsg] = useState("");

  const fetchBooks = async (page=1) => {
    try{
      setLoading(true);
      const data = await getSearchResult(searchQuery, null, page);
      setBooks(data.books || []);
      setTotalPages(data.totalPages || 0);
      setMsg(data.message || "");
    } catch(err){
      console.error(err);
      setBooks(0);
      setTotalPages(0);
    } finally{
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks(1);
  };

  const handlePageChange = (event, value) => {
    if (value >= 1 && value <= totalPages) {
      setCurrentPage(value);
      fetchBooks(value);
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
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

      {msg && !loading && books.length > 0 && (
        <p className="text-center text-gray-600 italic mb-6">
          {msg}
        </p>
      )}

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
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
      )}


    </div>
  )
}

export default SearchPage
