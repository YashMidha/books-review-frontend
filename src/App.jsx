import React from 'react'
import SearchPage from './pages/SearchPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookPage from './pages/BookPage';
import { ToastContainer } from 'react-toastify';
import AddToListPage from './pages/AddToListPage';
import RecommendationPage from './pages/RecommendationPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/book/:id/add" element={<AddToListPage />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  )
}

export default App