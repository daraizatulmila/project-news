<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    /**
     * Menampilkan semua berita milik user yang sedang login.
     */
    public function index()
    {
        // Ambil berita milik user yang sedang login, urutkan dari yang terbaru
        $news = News::where('user_id', Auth::id())->with('category', 'user')->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar berita berhasil diambil.',
            'data' => $news
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tittle' => 'required|string|max:255|unique:news',
            'content' => 'required|string',
            'category_id' => 'required|exist:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            //simpan gambar di folder 'publuc/news_images'
            $imagePath = $request->file('image')->store('news_images', 'public');
        }

        $news = News::create([
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title), '-' , time(),
            'content' => $request-> $request->content,
            'image' => $imagePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil dibuat.',
            'data' => $news
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        // Pastikan berita yang diminta adalah milik user yang sedang login
        if (Auth::id() !== $news->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail berita berhasil diambil.',
            'data' => $news->load('category', 'user')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        // Pastikan berita yang akan diupdate adalah milik user yang sedang login
        if (Auth::id() !== $news->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:news, title,' . $news->id,
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $news->title = $request->title;
        $news->slug = Str::slug($request->title) . '-' . time();
        $news->content = $request->content;
        $news->category_id = $request->category_id;

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            // Upload gambar baru
            $news->image = $request->file('image')->store('news_images', 'public');
        }

        $news->save();

        return response()->json([
            'success' => true,
            'message' => ' berita berhasil diupdate.',
            'data' => $news
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // Pastikan berita yang akan dihapus adalah milik user yang sedang login
        if (Auth::id() !== $news->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Hapus gambar dari storaage
        if ($news->image) {
            storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return response()->json([
            'success' => true,
            'message' => ' Berita berhasil dihapus.'
        ]);
    }
}