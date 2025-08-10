import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
