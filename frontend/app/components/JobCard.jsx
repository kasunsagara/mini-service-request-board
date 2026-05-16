import Link from "next/link";
import { HiArrowRight, HiOutlineTag, HiOutlineMapPin } from "react-icons/hi2";

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

      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="flex justify-between items-start gap-3 mb-4">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug line-clamp-2">
          {job.title}
        </h3>

        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${style.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {job.status}
        </span>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-5">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {job.category && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
            <HiOutlineTag className="w-3 h-3" />
            {job.category}
          </span>
        )}
        {job.location && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            <HiOutlineMapPin className="w-3 h-3" />
            {job.location}
          </span>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <time className="text-xs text-slate-400 font-medium">
          {new Date(job.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </time>
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View Details
          <HiArrowRight className="w-3.5 h-3.5 group-hover/lnk:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
