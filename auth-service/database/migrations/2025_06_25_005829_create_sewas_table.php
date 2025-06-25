<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sewa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('mobil_id')->constrained('mobil')->onDelete('cascade');
            $table->date('tanggal_sewa');
            $table->date('tanggal_kembali')->nullable();
            $table->enum('status', ['disewa', 'selesai'])->default('disewa');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sewa');
    }
};