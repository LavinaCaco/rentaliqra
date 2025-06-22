<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $table->string('foto_depan')->nullable()->after('keterangan');
            $table->string('foto_belakang')->nullable()->after('foto_depan');
            $table->string('foto_samping')->nullable()->after('foto_belakang');
            $table->string('foto_dalam')->nullable()->after('foto_samping');

            $table->dropColumn('foto');
        });
    }

    public function down(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $table->string('foto')->nullable()->after('keterangan');

            $table->dropColumn(['foto_depan', 'foto_belakang', 'foto_samping', 'foto_dalam']);
        });
    }
};