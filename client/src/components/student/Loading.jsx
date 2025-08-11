import React from 'react';
import { assets } from '../../assets/assets'; 

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100/70 to-cyan-200/40">
      <div className="flex flex-col items-center justify-center text-center gap-6 animate-pulse">
      
        <img
          src={assets.logo || "https://cdn-icons-png.flaticon.com/512/1055/1055646.png"}
          alt="LMS Logo"
          className="w-20 h-20 rounded-full shadow-lg"
        />

        <h1 className="text-2xl md:text-3xl font-semibold text-blue-700">
          Loading...
        </h1>

        <div className="w-48 h-1.5 bg-blue-300 rounded-full overflow-hidden relative">
          <div className="absolute h-full w-1/2 bg-blue-600 animate-loading-bar rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
