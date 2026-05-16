"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { HiArrowLeft, HiChevronDown, HiOutlineExclamationTriangle, HiOutlineInformationCircle, HiOutlineUser, HiOutlineTrash } from "react-icons/hi2";

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

  const fetchJob = async () => {
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
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

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
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

    loadJob();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setJob((prev) => ({ ...prev, status: newStatus }));
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      const data = await res.json();
      setJob(data.data ?? data);
    } catch (err) {
      alert(err.message);
      fetchJob(); 
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Permanently delete this request? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to delete.");
      }
      toast.success("Request deleted successfully.");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
      setDeleting(false);
    }
  };

  const isOwner = user && job && String(job.user) === String(user._id);
  const statusStyle = job ? (STATUS_CONFIG[job.status] || STATUS_CONFIG.Closed) : null;

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
        <HiOutlineExclamationTriangle className="w-6 h-6 text-red-400" />
      </div>
      <h2 className="text-base font-bold text-slate-900 mb-1">Oops!</h2>
      <p className="text-sm text-slate-400 mb-6">{error}</p>
      <Link href="/" className="sb-btn-primary text-sm px-5 py-2.5">← Back to Jobs</Link>
    </div>
  );

  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto sb-animate">

      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6">
        <HiArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      <div className="sb-card overflow-hidden">

        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />

        <div className="p-7 sm:p-10">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {job.title}
            </h1>

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
                  <HiChevronDown className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Description</p>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="sb-card p-5" style={{ boxShadow: "none" }}>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <HiOutlineInformationCircle className="w-3.5 h-3.5" />
                Job Details
              </p>
              <MetaRow label="Category" value={job.category} />
              <MetaRow label="Location"  value={job.location} />
              <MetaRow
                label="Posted"
                value={new Date(job.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              />
            </div>

            <div className="sb-card p-5" style={{ boxShadow: "none" }}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <HiOutlineUser className="w-3.5 h-3.5" />
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
              <HiOutlineTrash className="w-4 h-4" />
              {deleting ? "Deleting…" : "Delete Request"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
