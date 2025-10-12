"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        ABOUT
      </h1>

      {/* Foto Profil + Deskripsi */}
      <Card className="bg-slate-800 border border-blue-700/50 mb-8">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8">
          <div className="flex-shrink-0">
            <img
              src="/Aku.jpg"
              alt="Foto Profil Aku"
              className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-lg"
            />
          </div>
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-2xl font-bold text-white">
              Peminjaman Buku Perpustakaan
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Aplikasi manajemen perpustakaan sederhana untuk membantu
              pengelolaan peminjaman dan pengembalian buku secara digital.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detail Aplikasi */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Detail Aplikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-100">
          {" "}
          <section>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Deskripsi Aplikasi
            </h3>
            <p>
              PerpusKu dirancang untuk memudahkan petugas perpustakaan atau
              komunitas kecil dalam mencatat, mengelola, dan melacak aktivitas
              peminjaman buku tanpa ribet. Cocok untuk sekolah, kampus, atau
              taman baca.
            </p>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Fungsi Utama
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-200">
              <li>Menambahkan data peminjaman buku</li>
              <li>Menandai buku yang sudah dikembalikan</li>
              <li>Menampilkan riwayat peminjaman dalam bentuk tabel</li>
              <li>Statistik jumlah buku, peminjam, dan status peminjaman</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Pembuat Aplikasi
            </h3>
            <p>
              <strong>Nama:</strong> Naufal Ghaly Ramadhan
            </p>
            <p>
              <strong>Kontak:</strong> naufalghaly26@gmail.com | @naflyyd
            </p>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Teknologi yang Digunakan
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                Next.js
              </span>
              <span className="bg-sky-600 px-3 py-1 rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
                TypeScript
              </span>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
