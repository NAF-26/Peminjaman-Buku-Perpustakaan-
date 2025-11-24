"use client";

import { useState, useEffect } from "react";
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
  tanggalKembali: string | null;
  jenisBuku: string[];
}

export default function DashboardPage() {
  const [bukuList, setBukuList] = useState<Buku[]>([]);
  const [loading, setLoading] = useState(true);

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

  // LOAD DATA DARI SUPABASE
  const loadData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("peminjaman_buku")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Select error:", error);
    } else if (data) {
      const normalized = data.map((b) => ({
        ...b,
        jenisBuku: Array.isArray(b.jenisBuku)
          ? b.jenisBuku
          : b.jenisBuku
          ? [b.jenisBuku]
          : [],
      }));
      setBukuList(normalized as Buku[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // HANDLE CHECKBOX JENIS BUKU
  const handleJenisBukuChange = (jenis: string) => {
    setSelectedJenisBuku((prev) =>
      prev.includes(jenis) ? prev.filter((j) => j !== jenis) : [...prev, jenis]
    );
  };

  // TAMBAH KE SUPABASE
  const handleTambah = async () => {
    if (
      !newBukuJudul ||
      !newPengarang ||
      !newPeminjam ||
      !newPetugas ||
      selectedJenisBuku.length === 0
    ) {
      return alert("Isi semua data!");
    }

    const { error } = await supabase.from("peminjaman_buku").insert([
      {
        judul: newBukuJudul,
        pengarang: newPengarang,
        peminjam: newPeminjam,
        petugas: newPetugas,
        tanggalPinjam: new Date().toISOString().split("T")[0],
        tanggalKembali: null,
        jenisBuku: selectedJenisBuku,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Gagal menambah data");
      return;
    }

    setNewBukuJudul("");
    setNewPengarang("");
    setNewPeminjam("");
    setNewPetugas("");
    setSelectedJenisBuku([]);

    loadData();
  };

  // HAPUS
  const handleHapus = async (id: number) => {
    await supabase.from("peminjaman").delete().eq("id", id);
    loadData();
  };

  // UPDATE TANGGAL KEMBALI
  const handleToggleKembali = async (id: number) => {
    const buku = bukuList.find((b) => b.id === id);
    if (!buku) return;

    const newTanggal = buku.tanggalKembali
      ? null
      : new Date().toISOString().split("T")[0];

    await supabase
      .from("peminjaman")
      .update({ tanggalKembali: newTanggal })
      .eq("id", id);

    loadData();
  };

  // UI
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white text-center md:text-left">
        Peminjaman Buku Perpustakaan
      </h1>

      {/* Form Input Buku */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Tambah Peminjaman Baru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* --- INPUT FIELDS --- */}
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

          {/* --- CHECKBOXES --- */}
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
            Tambah Peminjaman
          </Button>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Total Buku</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {loading ? "..." : bukuList.length}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Peminjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {loading ? "..." : new Set(bukuList.map((b) => b.peminjam)).size}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dikembalikan</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {loading ? "..." : bukuList.filter((b) => b.tanggalKembali).length}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dipinjam</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {loading ? "..." : bukuList.filter((b) => !b.tanggalKembali).length}
          </CardContent>
        </Card>
      </div>

      {/* TABEL */}
      <Card className="bg-slate-800 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Riwayat Peminjaman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
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
                          {(Array.isArray(b.jenisBuku) ? b.jenisBuku : []).map(
                            (jenis, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded"
                              >
                                {jenis}
                              </span>
                            )
                          )}
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
