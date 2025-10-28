import React from 'react';
import { Link } from 'react-router-dom';
export default function Landing(){
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">CipherStudio</h1>
      <p className="mt-4 text-slate-600">Lightweight online IDE for quick prototypes.</p>
      <div className="mt-6">
        <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded">Get Started</Link>
      </div>
    </div>
  );
}
