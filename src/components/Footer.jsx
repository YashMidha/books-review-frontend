import { Copyright } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white px-4 py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

        <div className="flex items-center gap-2 text-gray-600">
          <Copyright className="w-4 h-4" />
          <span className="font-medium">
            {new Date().getFullYear()} <span className="font-semibold text-gray-800">CalmReads</span>
          </span>
        </div>


        <nav className="flex gap-4">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link to="/search" className="hover:text-gray-900">
            Search
          </Link>
          <Link to="/recommendation" className="hover:text-gray-900">
            Recommendations
          </Link>
          <Link to="/contact" className="hover:text-gray-900">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
