import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ToastProvider";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ServiceBoard — Find Trusted Tradespeople",
  description: "Browse service requests posted by homeowners or list a new job to find trusted tradespeople.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <AuthProvider>
          <ToastProvider />
          <Navbar />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center">
              <span className="text-xs text-slate-400 text-center">
                © {new Date().getFullYear()} <span className="font-semibold text-slate-600">ServiceBoard</span>. All rights reserved.
              </span>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

