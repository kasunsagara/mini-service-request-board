"use client";

import { useState, useEffect, useCallback } from "react";
import JobCard from "./components/JobCard";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery"];
const STATUSES   = ["Open", "In Progress", "Closed"];

export default function Home() {
  const { user } = useAuth();
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [category, setCategory] = useState("");
  const [status, setStatus]     = useState("");
  const [keyword, setKeyword]   = useState("");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (status)   params.append("status",   status);
      if (keyword)  params.append("keyword",  keyword);

      const url = `http://localhost:5000/api/jobs${params.toString() ? `?${params}` : ""}`;
      const res  = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data.data ?? data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, status, keyword]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const clearFilters = () => { setCategory(""); setStatus(""); setKeyword(""); };
  const hasFilters   = category || status || keyword;

  return (
    <div className="sb-animate">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-2">Service Board</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Browse <span className="text-indigo-600">Requests</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-lg">
            Find service requests posted by homeowners, or{" "}
            {user ? (
              <Link href="/jobs/new" className="text-indigo-600 font-semibold hover:underline">post your own</Link>
            ) : (
              <Link href="/register" className="text-indigo-600 font-semibold hover:underline">sign up to post yours</Link>
            )}.
          </p>
        </div>

        {user && (
          <Link
            href="/jobs/new"
            className="self-start sm:self-auto sb-btn-primary shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Post a Request
          </Link>
        )}
      </div>

      {/* ── Filters ──────────────────────────────────────── */}
      <div className="sb-card p-4 mb-8">
        {/* Search */}
        <div className="relative mb-3">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title or description…"
            className="sb-input pl-10"
          />
        </div>

        {/* Category + Status + Clear */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="sb-input pr-8 appearance-none text-sm py-2 px-3 cursor-pointer"
              style={{ width: "auto" }}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="sb-input pr-8 appearance-none text-sm py-2 px-3 cursor-pointer"
              style={{ width: "auto" }}
            >
              <option value="">All Statuses</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          {hasFilters && (
            <button onClick={clearFilters} className="sb-btn-ghost text-sm py-2 px-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}

          <span className="ml-auto text-xs text-slate-400 font-medium hidden sm:block">
            {loading ? "Loading…" : `${jobs.length} result${jobs.length !== 1 ? "s" : ""}`}
          </span>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      {loading ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 h-60 animate-pulse flex flex-col gap-3">
              <div className="h-5 bg-slate-100 rounded-lg w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-5/6" />
              <div className="mt-auto h-8 bg-slate-100 rounded-lg w-1/3" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="sb-card p-10 text-center border-red-100">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-red-600 mb-1">Something went wrong</p>
          <p className="text-xs text-slate-400 mb-5">{error}</p>
          <button onClick={fetchJobs} className="sb-btn-primary text-xs px-4 py-2">Retry</button>
        </div>
      ) : jobs.length === 0 ? (
        <div className="sb-card p-14 text-center border-dashed border-slate-200">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No requests found</h3>
          <p className="text-sm text-slate-400 mb-6">Try adjusting your filters or search term.</p>
          {hasFilters && (
            <button onClick={clearFilters} className="sb-btn-ghost text-sm">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
