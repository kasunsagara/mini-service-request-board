import Link from 'next/link';

export default function JobCard({ job }) {
  const statusConfig = {
    "Open": {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      dot: "bg-emerald-500",
      shadow: "shadow-emerald-500/20"
    },
    "In Progress": {
      bg: "bg-amber-50 border-amber-200 text-amber-700",
      dot: "bg-amber-500",
      shadow: "shadow-amber-500/20"
    },
    "Closed": {
      bg: "bg-slate-50 border-slate-200 text-slate-600",
      dot: "bg-slate-400",
      shadow: "shadow-slate-400/20"
    }
  };

  const style = statusConfig[job.status] || statusConfig["Closed"];

  return (
    <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1.5 hover:shadow-xl hover:bg-white hover:border-indigo-100 transition-all duration-300 flex flex-col h-full overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex justify-between items-start mb-4 gap-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
          {job.title}
        </h3>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${style.bg} ${style.shadow}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
          {job.status}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="inline-flex items-center text-xs font-medium text-indigo-700 bg-indigo-50/80 px-2.5 py-1.5 rounded-lg border border-indigo-100">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
          {job.category || 'Uncategorized'}
        </span>
        <span className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {job.location || 'Anywhere'}
        </span>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div className="text-xs text-gray-400 font-medium">
          {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
        <Link 
          href={`/jobs/${job._id}`}
          className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 group/link"
        >
          View Details 
          <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </div>
    </div>
  );
}
