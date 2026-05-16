"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Job request not found.");
        throw new Error("Failed to load job details.");
      }
      const data = await res.json();
      setJob(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      
      const updatedJob = await res.json();
      setJob(updatedJob);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this request?")) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job.");
      
      router.push("/");
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-red-100 shadow-sm mt-10">
        <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          &larr; Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Jobs
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{job.title}</h1>
            
            <div className="flex items-center gap-3 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <label className="text-sm text-slate-500 font-semibold pl-2">Status:</label>
              <div className="relative">
                <select
                  value={job.status}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm cursor-pointer disabled:opacity-50 transition-colors"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="flex items-center text-sm font-bold text-slate-900 mb-4 tracking-wide uppercase">
              <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              Description
            </h3>
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap text-base">
              {job.description}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Job Details
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center border-b border-indigo-100/50 pb-2">
                  <span className="font-medium text-indigo-900/60">Category</span> 
                  <span className="font-semibold text-indigo-900">{job.category || 'N/A'}</span>
                </li>
                <li className="flex justify-between items-center border-b border-indigo-100/50 pb-2">
                  <span className="font-medium text-indigo-900/60">Location</span> 
                  <span className="font-semibold text-indigo-900">{job.location || 'N/A'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-indigo-900/60">Posted On</span> 
                  <span className="font-semibold text-indigo-900">{new Date(job.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Contact Person
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex flex-col border-b border-slate-200 pb-2 gap-1">
                  <span className="font-medium text-slate-500">Name</span> 
                  <span className="font-semibold text-slate-900 text-base">{job.contactName || 'N/A'}</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-medium text-slate-500">Email Address</span> 
                  {job.contactEmail ? (
                    <a href={`mailto:${job.contactEmail}`} className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center">
                      {job.contactEmail}
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  ) : <span className="font-semibold text-slate-900">N/A</span>}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-50/30 px-8 py-5 border-t border-red-50 flex items-center justify-between">
          <p className="text-xs font-medium text-red-500/70">Danger Zone</p>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="group flex items-center gap-2 text-red-600 hover:text-white font-semibold text-sm px-5 py-2.5 border border-red-200 rounded-xl hover:bg-red-600 hover:border-red-600 transition-all shadow-sm hover:shadow-md hover:shadow-red-500/20 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            {deleting ? "Deleting..." : "Delete Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
