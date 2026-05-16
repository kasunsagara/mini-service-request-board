"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery"];

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="sb-label">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "", description: "", category: "",
    location: "", contactName: "", contactEmail: "",
  });
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to create request");
      }
      router.push("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto sb-animate">

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Jobs
      </Link>

      {/* Card */}
      <div className="sb-card overflow-hidden">

        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />

        <div className="p-7 sm:p-10">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Post a Request</h1>
            <p className="mt-1 text-sm text-slate-500">Fill in the details so tradespeople can find your job.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
              <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <Field label="Job Title" required>
              <input
                type="text" name="title" required
                value={formData.title} onChange={handleChange}
                placeholder="e.g. Need a plumber for a leaking kitchen tap"
                className="sb-input"
              />
            </Field>

            {/* Description */}
            <Field label="Description" required>
              <textarea
                name="description" required rows={4}
                value={formData.description} onChange={handleChange}
                placeholder="Describe the issue, dimensions, accessibility requirements…"
                className="sb-input resize-none"
              />
            </Field>

            {/* Category + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Category" required>
                <div className="relative">
                  <select
                    name="category" required
                    value={formData.category} onChange={handleChange}
                    className="sb-input appearance-none pr-9 cursor-pointer"
                  >
                    <option value="" disabled>Select a category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </Field>

              <Field label="Location" required>
                <input
                  type="text" name="location" required
                  value={formData.location} onChange={handleChange}
                  placeholder="e.g. Glasgow"
                  className="sb-input"
                />
              </Field>
            </div>

            {/* Contact section */}
            <div className="pt-5 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Contact Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your Name" required>
                  <input
                    type="text" name="contactName" required
                    value={formData.contactName} onChange={handleChange}
                    placeholder="Jane Smith"
                    className="sb-input"
                  />
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email" name="contactEmail" required
                    value={formData.contactEmail} onChange={handleChange}
                    placeholder="jane@example.com"
                    className="sb-input"
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <button type="submit" disabled={loading} className="sb-btn-primary px-8">
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Posting…
                  </>
                ) : (
                  <>
                    Post Request
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
