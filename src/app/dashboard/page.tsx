// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient"; // ← Import client

interface Buku {
  id: number;
  judul: string;
  pengarang: string;
  peminjam: string;
  petugas: string;
  tanggal_pinjam: string; // ← sesuaikan nama field dengan database
  tanggal_kembali: string | null; // ← bisa null
  jenis_buku: string[]; // ← array of string
}

export default function DashboardPage() {
  // State untuk data buku dari Supabase
  const [bukuList, setBukuList] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state (untuk tambah data — tapi tidak disimpan ke DB karena fokus READ)
  const [newBukuJudul, setNewBukuJudul] = useState("");
  const [newPengarang, setNewPengarang] = useState("");
  const [newPeminjam, setNewPeminjam] = useState("");
  const [newPetugas, setNewPetugas] = useState("");
  const [selectedJenisBuku, setSelectedJenisBuku] = useState<string[]>([]);

  const jenisBukuOptions = [
    "Pendidikan",
    "Fiksi",
    "Non-Fiksi",
    "Referensi",
    "Novel",
    "Komik",
  ];

  // Ambil data dari Supabase saat komponen mount
  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("peminjaman_buku")
          .select("*")
          .order("tanggal_pinjam", { ascending: false });

        if (error) throw error;

        setBukuList(data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError("Gagal mengambil data dari database: " + err.message);
        } else {
          setError(
            "Terjadi kesalahan yang tidak diketahui saat mengambil data."
          );
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeminjaman();
  }, []);

  // Handler checkbox jenis buku (untuk form tambah — dummy saja)
  const handleJenisBukuChange = (jenis: string) => {
    setSelectedJenisBuku((prev) =>
      prev.includes(jenis) ? prev.filter((j) => j !== jenis) : [...prev, jenis]
    );
  };

  // Handler tambah — hanya update state lokal (tidak ke DB, karena fokus READ)
  const handleTambah = () => {
    if (
      !newBukuJudul ||
      !newPengarang ||
      !newPeminjam ||
      !newPetugas ||
      selectedJenisBuku.length === 0
    ) {
      return alert(
        "Isi judul, pengarang, peminjam, petugas, dan minimal satu jenis buku!"
      );
    }

    const nextId =
      bukuList.length > 0 ? Math.max(...bukuList.map((b) => b.id)) + 1 : 1;

    const newBuku: Buku = {
      id: nextId,
      judul: newBukuJudul,
      pengarang: newPengarang,
      peminjam: newPeminjam,
      petugas: newPetugas,
      tanggal_pinjam: new Date().toISOString().split("T")[0],
      tanggal_kembali: null,
      jenis_buku: selectedJenisBuku,
    };

    setBukuList([newBuku, ...bukuList]); // tambah ke awal agar muncul di atas
    setNewBukuJudul("");
    setNewPengarang("");
    setNewPeminjam("");
    setNewPetugas("");
    setSelectedJenisBuku([]);
  };

  // Handler hapus — hanya dari state lokal
  const handleHapus = (id: number) => {
    setBukuList(bukuList.filter((b) => b.id !== id));
  };

  // Handler toggle kembali — hanya state lokal
  const handleToggleKembali = (id: number) => {
    setBukuList(
      bukuList.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            tanggal_kembali: b.tanggal_kembali
              ? null
              : new Date().toISOString().split("T")[0],
          };
        }
        return b;
      })
    );
  };

  // Jika loading
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-white">Memuat data peminjaman dari database...</p>
      </div>
    );
  }

  // Jika error
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-red-400 bg-red-900/30 p-4 rounded-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white text-center md:text-left">
        Peminjaman Buku Perpustakaan
      </h1>

      {/* Form Input Buku (dummy, tidak disimpan ke DB) */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Tambah Peminjaman Baru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="judul" className="text-white block mb-1">
              Judul Buku
            </Label>
            <Input
              id="judul"
              placeholder="Judul Buku"
              value={newBukuJudul}
              onChange={(e) => setNewBukuJudul(e.target.value)}
              className="w-full text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
          </div>

          <div>
            <Label htmlFor="pengarang" className="text-white block mb-1">
              Nama Pengarang
            </Label>
            <Input
              id="pengarang"
              placeholder="Nama Pengarang"
              value={newPengarang}
              onChange={(e) => setNewPengarang(e.target.value)}
              className="w-full text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
          </div>

          <div>
            <Label htmlFor="peminjam" className="text-white block mb-1">
              Nama Peminjam
            </Label>
            <Input
              id="peminjam"
              placeholder="Nama Peminjam"
              value={newPeminjam}
              onChange={(e) => setNewPeminjam(e.target.value)}
              className="w-full text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
          </div>

          <div>
            <Label htmlFor="petugas" className="text-white block mb-1">
              Nama Petugas
            </Label>
            <Input
              id="petugas"
              placeholder="Nama Petugas"
              value={newPetugas}
              onChange={(e) => setNewPetugas(e.target.value)}
              className="w-full text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
          </div>

          <div>
            <Label className="text-white block mb-2">Jenis Buku</Label>
            <div className="flex flex-wrap gap-4">
              {jenisBukuOptions.map((jenis) => (
                <div key={jenis} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`jenis-${jenis}`}
                    checked={selectedJenisBuku.includes(jenis)}
                    onChange={() => handleJenisBukuChange(jenis)}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor={`jenis-${jenis}`} className="text-gray-200">
                    {jenis}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleTambah} className="w-full md:w-auto">
            Tambah Peminjaman (Lokal)
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            *Catatan: Data ini hanya disimpan sementara di browser, tidak ke
            database.
          </p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Total Buku</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {bukuList.length}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Peminjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {new Set(bukuList.map((b) => b.peminjam)).size}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dikembalikan</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {bukuList.filter((b) => b.tanggal_kembali).length}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dipinjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {bukuList.filter((b) => !b.tanggal_kembali).length}
          </CardContent>
        </Card>
      </div>

      {/* Tabel Riwayat Peminjaman */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Riwayat Peminjaman</CardTitle>
        </CardHeader>
        <CardContent>
          {bukuList.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Belum ada data.</p>
          ) : (
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
                    <th className="p-3 text-left text-white">
                      Tanggal Kembali
                    </th>
                    <th className="p-3 text-left text-white">Status</th>
                    <th className="p-3 text-left text-white">Aksi</th>
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
                          {b.jenis_buku.map((jenis, idx) => (
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
                      <td className="p-3 text-gray-100">
                        {new Date(b.tanggal_pinjam).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-3 text-gray-100">
                        {b.tanggal_kembali
                          ? new Date(b.tanggal_kembali).toLocaleDateString(
                              "id-ID"
                            )
                          : "-"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            b.tanggal_kembali
                              ? "bg-green-600 text-white"
                              : "bg-yellow-600 text-white"
                          }`}
                        >
                          {b.tanggal_kembali ? "Dikembalikan" : "Dipinjam"}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <Button
                          size="sm"
                          variant={b.tanggal_kembali ? "outline" : "default"}
                          onClick={() => handleToggleKembali(b.id)}
                          className={
                            b.tanggal_kembali
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : ""
                          }
                        >
                          {b.tanggal_kembali ? "Batalkan" : "Tandai Kembali"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleHapus(b.id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
