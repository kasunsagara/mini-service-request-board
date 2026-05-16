"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { HiArrowRight, HiBars3, HiOutlineBriefcase, HiPlus, HiXMark } from "react-icons/hi2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:bg-indigo-700 transition-colors">
              <HiOutlineBriefcase className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-[1.05rem] font-extrabold text-slate-800 tracking-tight">
              Service<span className="text-indigo-600">Board</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5">
            <Link
              href="/"
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-150"
            >
              Browse Jobs
            </Link>

            {user ? (
              <>
                <Link
                  href="/jobs/new"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all duration-150"
                >
                  <HiPlus className="w-4 h-4" />
                  Post Request
                </Link>

                <div className="flex items-center gap-2 ml-1 pl-3 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden md:block">{user.username}</span>
                  <button
                    onClick={logout}
                    className="ml-1 px-3 py-1.5 text-xs font-semibold bg-red-500 text-white hover:bg-red-700 rounded-lg border border-transparent hover:border-red-100 transition-all duration-150"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-500/25 transition-all duration-150 hover:-translate-y-px"
                >
                  Sign Up
                  <HiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          <button
            className="sm:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiXMark className="w-5 h-5" />
            ) : (
              <HiBars3 className="w-5 h-5" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden border-t border-slate-100 py-3 flex flex-col gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-lg">
              Browse Jobs
            </Link>
            {user ? (
              <>
                <Link href="/jobs/new" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg">
                  + Post Request
                </Link>
                <div className="px-3 py-2 text-xs text-slate-400">Logged in as <span className="font-semibold text-slate-600">{user.username}</span></div>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-lg">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
