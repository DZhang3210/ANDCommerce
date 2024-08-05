// app/loading.tsx

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[0] flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        {/* Loading Text */}
        <div className="mt-4 text-lg text-gray-700">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
