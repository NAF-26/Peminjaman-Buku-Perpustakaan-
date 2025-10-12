"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/"); // kembali ke landing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Navbar Dashboard */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md shadow-lg z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            📖 PerpusKu
          </h1>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="hover:text-blue-300 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/dashboard/about"
              className="hover:text-blue-300 transition font-medium"
            >
              About
            </Link>

            <div className="flex items-center gap-4 ml-6">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Konten Halaman Dashboard */}
      <main className="pt-24 px-6 md:px-10 pb-10">{children}</main>
    </div>
  );
}
