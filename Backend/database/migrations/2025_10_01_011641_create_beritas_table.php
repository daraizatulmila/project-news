<?php

// database/migrations/2025_10_01_000000_create_beritas_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('beritas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('deskripsi');
            $table->string('gambar'); // path gambar
            $table->timestamps(); // otomatis created_at & updated_at
        });
    }

    public function down(): void {
        Schema::dropIfExists('beritas');
    }
};