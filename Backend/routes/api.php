<?php

use App\Http\Controllers\BeritaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('/login', [AuthController::class, 'login']);
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{id}', [BeritaController::class, 'show']); // detail

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/berita', [BeritaController::class, 'store']);  // tambah
    Route::post('/berita/{id}', [BeritaController::class, 'update']); // update
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy']); // hapus
});
