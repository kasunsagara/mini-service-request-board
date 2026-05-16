import Link from "next/link";

export default function JobCard({ job }) {
  const statusConfig = {
    Open: {
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot:  "bg-emerald-500",
    },
    "In Progress": {
      pill: "bg-amber-50 text-amber-700 border-amber-200",
      dot:  "bg-amber-500",
    },
    Closed: {
      pill: "bg-slate-100 text-slate-500 border-slate-200",
      dot:  "bg-slate-400",
    },
  };

  const style = statusConfig[job.status] || statusConfig["Closed"];

  return (
    <article className="group relative flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_28px_-4px_rgba(99,102,241,0.18)] hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* Accent bar on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-4">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug line-clamp-2">
          {job.title}
        </h3>

        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${style.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {job.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-5">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {job.category && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {job.category}
          </span>
        )}
        {job.location && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <time className="text-xs text-slate-400 font-medium">
          {new Date(job.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </time>
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View Details
          <svg className="w-3.5 h-3.5 group-hover/lnk:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
