import React from 'react';
import { Link } from 'react-router-dom';
import BlurText from '@/components/BlurText';
import { useAuth } from '@/context/AuthContext.jsx';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="text-gray-800 text-center py-20 px-4">
      <div className='mx-auto max-w-4xl'>
      {user && (
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-4">Welcome back, {user.name}!</h2>
      )}
      <BlurText
        text="Discover Your Next Favorite Book."
        delay={300}
        animateBy="words"
        direction="top"
        className="text-4xl md:text-6xl mb-6"
      />
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 mb-8">
        CalmReads assists you in discovering engaging books and sharing your experience with a lively community.
      </p>
      <Link
        to="/recommendation"
        className="bg-black text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-800 transition-colors duration-300"
      >
        Browse Recommendations
      </Link>
      </div>
    </div>
  );
};

export default HomePage;
