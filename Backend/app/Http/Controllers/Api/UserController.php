<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::latest()->paginate(10);
        return response()->json([
            'succes' => true,
            'message' => 'Daftar user berhasil diambil.',
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,reporter',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'succes' => true,
            'message' => 'User berhasil dibuat',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail user berhasil diambil.',
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' .$user->id,
            'role' => 'required|in:admin,reporter',
            'password' => 'nullable|string|min:8', //password opsional saat update
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        // jika ada password baru, hash dan update passwordnya
        if($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        return response()->json([
            'success' => true,
            'message' => 'User berhasil diupdate.',
            'data' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Tambahkan proteksi agar admin tidak bisa menghapus dirinya sendiri
        if (Auth::id() === $user->id) {
            return response()->json([
                'succes' => false,
                'message' => 'Anda tidak bisa menghapus akun Anda sendiri.'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil dihapus.'
        ]);
    }
}