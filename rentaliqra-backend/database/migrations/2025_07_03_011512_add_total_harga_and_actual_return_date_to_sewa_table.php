<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('sewa', function (Blueprint $table) {
            $table->decimal('total_harga', 10, 2)->default(0)->after('tanggal_kembali');

            $table->timestamp('tanggal_kembali_aktual')->nullable()->after('total_harga');
        });
    }


    public function down(): void
    {
        Schema::table('sewa', function (Blueprint $table) {
            $table->dropColumn('tanggal_kembali_aktual');
            $table->dropColumn('total_harga');
        });
    }
};