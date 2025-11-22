"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Buku {
  id: number;
  judul: string;
  pengarang: string;
  peminjam: string;
  petugas: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  jenisBuku: string[];
}

export default function DashboardPage() {
  const [bukuList, setBukuList] = useState<Buku[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("peminjaman_buku")
        .select("*");
      if (error) {
        setError("Gagal mengambil data: " + error.message);
      } else {
        // Tidak pakai ": any" pada row
        const bukuArray: Buku[] = (data || []).map((row) => ({
          ...row,
          jenisBuku: Array.isArray(row.jenisBuku)
            ? row.jenisBuku
            : typeof row.jenisBuku === "string"
            ? JSON.parse(row.jenisBuku)
            : [],
        }));
        setBukuList(bukuArray);
      }
    };
    fetchData();
  }, []);

  // Statistik
  const totalBuku = bukuList.length;
  const totalPeminjam = new Set(bukuList.map((b) => b.peminjam)).size;
  const totalDikembalikan = bukuList.filter((b) => b.tanggalKembali).length;
  const totalDipinjam = bukuList.filter((b) => !b.tanggalKembali).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white text-center md:text-left">
        Peminjaman Buku Perpustakaan
      </h1>
      {/* Tampilkan error jika gagal */}
      {error && (
        <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Total Buku</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalBuku}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Peminjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalPeminjam}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dikembalikan</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalDikembalikan}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dipinjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalDipinjam}
          </CardContent>
        </Card>
      </div>

      {/* Tabel Riwayat Peminjaman */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Riwayat Peminjaman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="p-3 text-left text-white">ID</th>
                  <th className="p-3 text-left text-white">Judul Buku</th>
                  <th className="p-3 text-left text-white">Jenis</th>
                  <th className="p-3 text-left text-white">Pengarang</th>
                  <th className="p-3 text-left text-white">Peminjam</th>
                  <th className="p-3 text-left text-white">Petugas</th>
                  <th className="p-3 text-left text-white">Tanggal Pinjam</th>
                  <th className="p-3 text-left text-white">Tanggal Kembali</th>
                  <th className="p-3 text-left text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {bukuList.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-slate-700 hover:bg-slate-700/50"
                  >
                    <td className="p-3 text-gray-100">{b.id}</td>
                    <td className="p-3 text-gray-100">{b.judul}</td>
                    <td className="p-3 text-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {b.jenisBuku.map((jenis, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded"
                          >
                            {jenis}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-gray-100">{b.pengarang}</td>
                    <td className="p-3 text-gray-100">{b.peminjam}</td>
                    <td className="p-3 text-gray-100">{b.petugas}</td>
                    <td className="p-3 text-gray-100">{b.tanggalPinjam}</td>
                    <td className="p-3 text-gray-100">
                      {b.tanggalKembali || "-"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          b.tanggalKembali
                            ? "bg-green-600 text-white"
                            : "bg-yellow-600 text-white"
                        }`}
                      >
                        {b.tanggalKembali ? "Dikembalikan" : "Dipinjam"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
