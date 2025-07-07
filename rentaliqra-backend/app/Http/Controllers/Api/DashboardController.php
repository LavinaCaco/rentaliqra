<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use App\Models\User; 
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function getStats()
    {
        $totalMobil = Mobil::count();
        $mobilTersedia = Mobil::where('status', 'ready')->count();
        $mobilDisewa = Mobil::where('status', 'disewa')->count();

        $totalPengguna = User::where('level', 2)->count();
        $penggunaTerbaru = User::where('level', 2)->latest()->take(5)->get([
            'id', 'first_name', 'last_name', 'email', 'phone', 'created_at'
        ]);

        return response()->json([
            'total_mobil' => $totalMobil,
            'mobil_tersedia' => $mobilTersedia,
            'mobil_disewa' => $mobilDisewa,
            'total_pengguna' => $totalPengguna,
            'pengguna_terbaru' => $penggunaTerbaru,
        ]);
    }
}
