"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Buku {
  id: number;
  judul: string;
  pengarang: string;
  peminjam: string;
  tanggalPinjam: string;
  tanggalKembali: string;
}

export default function DashboardPage() {
  const [bukuList, setBukuList] = useState<Buku[]>([
    {
      id: 1,
      judul: "Matematika Dasar",
      pengarang: "Prof. Sukirman",
      peminjam: "Ghaly",
      tanggalPinjam: "2025-10-07",
      tanggalKembali: "2025-10-14",
    },
    {
      id: 2,
      judul: "Fisika Lanjut",
      pengarang: "Dr. Ahmad Fauzi",
      peminjam: "Naufal",
      tanggalPinjam: "2025-10-01",
      tanggalKembali: "",
    },
  ]);

  const [newBukuJudul, setNewBukuJudul] = useState("");
  const [newPengarang, setNewPengarang] = useState("");
  const [newPeminjam, setNewPeminjam] = useState("");

  const handleTambah = () => {
    if (!newBukuJudul || !newPengarang || !newPeminjam)
      return alert("Isi judul, pengarang, dan peminjam!");

    const newBuku: Buku = {
      id: Date.now(),
      judul: newBukuJudul,
      pengarang: newPengarang,
      peminjam: newPeminjam,
      tanggalPinjam: new Date().toISOString().split("T")[0],
      tanggalKembali: "",
    };

    setBukuList([...bukuList, newBuku]);
    setNewBukuJudul("");
    setNewPengarang("");
    setNewPeminjam("");
  };

  const handleHapus = (id: number) => {
    setBukuList(bukuList.filter((b) => b.id !== id));
  };

  const handleToggleKembali = (id: number) => {
    setBukuList(
      bukuList.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            tanggalKembali: b.tanggalKembali
              ? ""
              : new Date().toISOString().split("T")[0],
          };
        }
        return b;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white text-center md:text-left">
        Peminjaman Buku Perpustakaan
      </h1>

      {/* Form Input Buku */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Tambah Peminjaman Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <Input
              placeholder="Judul Buku"
              value={newBukuJudul}
              onChange={(e) => setNewBukuJudul(e.target.value)}
              className="flex-1 text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
            <Input
              placeholder="Nama Pengarang"
              value={newPengarang}
              onChange={(e) => setNewPengarang(e.target.value)}
              className="flex-1 text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
            <Input
              placeholder="Nama Peminjam"
              value={newPeminjam}
              onChange={(e) => setNewPeminjam(e.target.value)}
              className="flex-1 text-white bg-transparent placeholder:text-gray-300 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-md"
            />
            <Button onClick={handleTambah} className="shrink-0">
              Tambah
            </Button>
          </div>
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
            <CardTitle className="text-white">Peminjam Unik</CardTitle>
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
            {bukuList.filter((b) => b.tanggalKembali).length}
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dipinjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {bukuList.filter((b) => !b.tanggalKembali).length}
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
                  <th className="p-3 text-left text-white">Pengarang</th>
                  <th className="p-3 text-left text-white">Peminjam</th>
                  <th className="p-3 text-left text-white">Tanggal Pinjam</th>
                  <th className="p-3 text-left text-white">Tanggal Kembali</th>
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
                    <td className="p-3 text-gray-100">{b.pengarang}</td>
                    <td className="p-3 text-gray-100">{b.peminjam}</td>
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
                    <td className="p-3 space-x-2">
                      <Button
                        size="sm"
                        variant={b.tanggalKembali ? "outline" : "default"}
                        onClick={() => handleToggleKembali(b.id)}
                        className={
                          b.tanggalKembali
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : ""
                        }
                      >
                        {b.tanggalKembali ? "Batalkan" : "Tandai Kembali"}
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
        </CardContent>
      </Card>
    </div>
  );
}
