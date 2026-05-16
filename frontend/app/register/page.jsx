"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { HiArrowPath, HiOutlineBriefcase, HiOutlineExclamationCircle } from "react-icons/hi2";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await register(username, email, password);
    if (!result.success) { setError(result.message); setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sb-animate">
      <div className="w-full max-w-md">

        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <HiOutlineBriefcase className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="sb-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create an account</h1>
            <p className="mt-1.5 text-sm text-slate-500">Sign up to post and manage service requests.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
              <HiOutlineExclamationCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="sb-label">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                className="sb-input" placeholder="johndoe" />
            </div>
            <div>
              <label className="sb-label">Email address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="sb-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="sb-label">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="sb-input" placeholder="Min. 8 characters" />
            </div>

            <button type="submit" disabled={loading} className="sb-btn-primary w-full mt-2">
              {loading ? (
                <>
                  <HiArrowPath className="animate-spin w-4 h-4" />
                  Creating account…
                </>
              ) : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
