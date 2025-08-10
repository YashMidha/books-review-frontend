import React from 'react'
import SearchPage from './pages/SearchPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookPage from './pages/BookPage';
import { ToastContainer } from 'react-toastify';
import AddToListPage from './pages/AddToListPage';
import RecommendationPage2 from './pages/RecommendationPage2';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyReviews from './pages/MyReviews';
import Settings from './pages/Settings';
import AllBooksList from './pages/AllBooksList';
import CompletedList from './pages/CompletedList';
import ReadingList from './pages/ReadingList';
import PlanToReadList from './pages/PlanToReadList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from "@/components/ProtectedRoute";
import RedirectIfAuth from "@/components/RedirectIfAuth";
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import SearchByGenre from './pages/SearchByGenre';
import PopularPage from './pages/PopularPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/browse/genre" element={<SearchByGenre />} />
            <Route path="/browse/popular" element={<PopularPage />} />
            <Route path="/book/:id/add" element={
              <ProtectedRoute>
                <AddToListPage />
              </ProtectedRoute>
            } />
            <Route path="/recommendation" element={
              <ProtectedRoute>
                <RecommendationPage2 />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={
              <RedirectIfAuth>
                  <SignupPage />
              </RedirectIfAuth>
            } />
            <Route path="/login" element={
              <RedirectIfAuth>
                <LoginPage />
              </RedirectIfAuth>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                  <Profile />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="list/reading" element={<ReadingList />} />
              <Route path="list/plan-to-read" element={<PlanToReadList />} />
              <Route path="list/completed" element={<CompletedList />} />
              <Route path="list/all" element={<AllBooksList />} />
              <Route path="reviews" element={<MyReviews />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  )
}

export default App