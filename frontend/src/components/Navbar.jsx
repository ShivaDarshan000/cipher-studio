import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">CipherStudio</Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user.username}</span>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={()=>{ logout(); nav('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
