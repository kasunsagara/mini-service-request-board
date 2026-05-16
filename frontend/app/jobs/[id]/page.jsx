"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const STATUS_OPTIONS = ["Open", "In Progress", "Closed"];

const STATUS_CONFIG = {
  Open:         { pill: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  "In Progress":{ pill: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-500"   },
  Closed:       { pill: "bg-slate-100 text-slate-500 border-slate-200",      dot: "bg-slate-400"   },
};

function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}

export default function JobDetailPage({ params }) {
  const { id } = use(params);
  const router  = useRouter();
  const { user } = useAuth();

  const [job,      setJob]      = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchJob(); }, [id]);

  const fetchJob = async () => {
    try {
      const res  = await fetch(`http://localhost:5000/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error(res.status === 404 ? "Request not found." : "Failed to load details.");
      }
      const data = await res.json();
      setJob(data.data ?? data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    // Optimistic update
    setJob((prev) => ({ ...prev, status: newStatus }));
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      const data = await res.json();
      setJob(data.data ?? data);
    } catch (err) {
      alert(err.message);
      fetchJob(); // revert on error
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Permanently delete this request? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to delete.");
      }
      router.push("/");
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  };

  const isOwner = user && job && String(job.user) === String(user._id);
  const statusStyle = job ? (STATUS_CONFIG[job.status] || STATUS_CONFIG.Closed) : null;

  /* ── States ─────────────────────────────────────── */
  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Loading…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto sb-card p-10 text-center mt-10 sb-animate">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-base font-bold text-slate-900 mb-1">Oops!</h2>
      <p className="text-sm text-slate-400 mb-6">{error}</p>
      <Link href="/" className="sb-btn-primary text-sm px-5 py-2.5">← Back to Jobs</Link>
    </div>
  );

  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto sb-animate">

      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Jobs
      </Link>

      <div className="sb-card overflow-hidden">

        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />

        <div className="p-7 sm:p-10">

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {job.title}
            </h1>

            {/* Status selector */}
            <div className="shrink-0 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
              <div className="relative">
                <select
                  value={job.status}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="text-sm font-semibold text-slate-700 bg-transparent border-none outline-none pr-6 appearance-none cursor-pointer disabled:opacity-60"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Description</p>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Job details */}
            <div className="sb-card p-5" style={{ boxShadow: "none" }}>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Job Details
              </p>
              <MetaRow label="Category" value={job.category} />
              <MetaRow label="Location"  value={job.location} />
              <MetaRow
                label="Posted"
                value={new Date(job.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              />
            </div>

            {/* Contact */}
            <div className="sb-card p-5" style={{ boxShadow: "none" }}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contact Person
              </p>
              <MetaRow label="Name"  value={job.contactName} />
              {job.contactEmail ? (
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</span>
                  <a href={`mailto:${job.contactEmail}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    {job.contactEmail}
                  </a>
                </div>
              ) : <MetaRow label="Email" value={null} />}
            </div>
          </div>
        </div>

        {/* Danger zone — only owner sees it */}
        {isOwner && (
          <div className="px-7 sm:px-10 py-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Danger Zone</p>
              <p className="text-xs text-slate-400 mt-0.5">This action cannot be undone.</p>
            </div>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-red-600 border border-red-200 bg-white rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md hover:shadow-red-500/20 transition-all duration-200 disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {deleting ? "Deleting…" : "Delete Request"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
