import { Hourglass } from "lucide-react";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl flex gap-2 items-center font-bold text-gray-800">
        <Hourglass className="w-8 h-8" /> Coming Soon...
      </h1>
    </div>
  );
};

export default ComingSoon;