"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-blue-900 overflow-hidden text-white">
      {/* Background efek cahaya */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-700/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-3xl space-y-6 flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Selamat Datang di{" "}
          <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            Peminjaman Buku Perpustakaan
          </span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
          Aplikasi ini membantu siswa dan guru dalam proses peminjaman buku
          perpustakaan. Data tersimpan aman, dan proses peminjaman jadi lebih
          teratur.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link href="/login">
            <button className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg font-semibold shadow-lg transition">
              LOGIN
              <ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
    </main>
  );
}
