"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await login(email, password);
    if (!result.success) { setError(result.message); setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sb-animate">
      <div className="w-full max-w-md">

        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>

        <div className="sb-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="mt-1.5 text-sm text-slate-500">Sign in to manage your service requests.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
              <svg className="w-4.5 h-4.5 shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="sb-label">Email address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="sb-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="sb-label">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="sb-input" placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} className="sb-btn-primary w-full mt-2">
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
