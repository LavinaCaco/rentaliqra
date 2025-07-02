<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats()
    {
        $totalMobil = Mobil::count();
        $mobilTersedia = Mobil::where('status', 'ready')->count();
        $mobilDisewa = Mobil::where('status', 'disewa')->count();

        return response()->json([
            'total_mobil' => $totalMobil,
            'mobil_tersedia' => $mobilTersedia,
            'mobil_disewa' => $mobilDisewa,
        ]);
    }
}
