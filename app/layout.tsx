import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statement Audit",
  description: "Do not win arguments. Clarify them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-gray-900 text-sm tracking-tight hover:text-accent transition-colors">
              Statement Audit
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/audit" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Audit</Link>
              <Link href="/history" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">History</Link>
              <Link href="/framework" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Framework</Link>
              <Link href="/settings" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Settings</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="border-t border-gray-100 py-4">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span>Statement Audit audits claims, not persons.</span>
            <span>No person rating. No moral score. No debate game.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
