import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <Link href="/" className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600 tracking-tight">
              ServiceBoard
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              Browse Jobs
            </Link>
            <Link
              href="/jobs/new"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-gray-800 border border-transparent rounded-xl hover:bg-gray-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <span>Post a Request</span>
              <svg className="w-4 h-4 ml-1.5 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
