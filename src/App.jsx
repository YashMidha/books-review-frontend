import React from 'react'
import SearchPage from './pages/SearchPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookPage from './pages/BookPage';
import { ToastContainer } from 'react-toastify';
import AddToListPage from './pages/AddToListPage';
import RecommendationPage from './pages/RecommendationPage';
import RecommendationPage2 from './pages/RecommendationPage2';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyReviews from './pages/MyReviews';
import Settings from './pages/Settings';
import AllBooksList from './pages/AllBooksList';
import CompletedList from './pages/CompletedList';
import ReadingList from './pages/ReadingList';
import PlanToReadList from './pages/PlanToReadList';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/book/:id/add" element={<AddToListPage />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
          <Route path="/recommendation2" element={<RecommendationPage2 />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<Dashboard />} />
            <Route path="list/reading" element={<ReadingList />} />
            <Route path="list/plan-to-read" element={<PlanToReadList />} />
            <Route path="list/completed" element={<CompletedList />} />
            <Route path="list/all" element={<AllBooksList />} />
            <Route path="reviews" element={<MyReviews />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  )
}

export default App