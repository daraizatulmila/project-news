<?php

// app/Http/Controllers/BeritaController.php
namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    // 🟢 ambil semua berita (untuk dashboard & user)
    public function index()
    {
        return response()->json(Berita::latest()->get());
    }

    // 🟢 tambah berita
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $path = $request->file('gambar')->store('berita', 'public');

        $berita = Berita::create([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'],
            'gambar' => $path,
        ]);

        return response()->json(['message' => 'Berita berhasil ditambahkan', 'data' => $berita]);
    }

    // 🟢 update berita
    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|string|max:255',
            'deskripsi' => 'sometimes|string',
            'gambar' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:5000',
        ]);

        if ($request->hasFile('gambar')) {
            // hapus file lama
            Storage::disk('public')->delete($berita->gambar);
            $path = $request->file('gambar')->store('berita', 'public');
            $validated['gambar'] = $path;
        }

        $berita->update($validated);

        return response()->json(['message' => 'Berita berhasil diupdate', 'data' => $berita]);
    }

    // 🟢 hapus berita
    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        Storage::disk('public')->delete($berita->gambar);
        $berita->delete();

        return response()->json(['message' => 'Berita berhasil dihapus']);
    }

    //Detail berita
    public function show($id)
    {
        $berita = Berita::findOrFail($id);
        return response()->json($berita);
    }
}
