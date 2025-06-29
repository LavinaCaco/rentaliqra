<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sewa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SewaController extends Controller
{
    public function index()
    {
        $sewa = Sewa::with(['user:id,first_name,last_name', 'mobil:id,merek,tipe'])
                    ->latest()
                    ->get();
        return response()->json($sewa);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobil_id' => 'required|exists:mobil,id',
            'tanggal_mulai' => 'required|date',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mobil = \App\Models\Mobil::find($request->mobil_id);

        if ($mobil->status !== 'ready') {
            return response()->json(['message' => 'Mobil ini sedang tidak tersedia untuk disewa.'], 409);
        }

        $sewa = null;
        DB::transaction(function () use ($request, $mobil, &$sewa) {
            $sewa = Sewa::create([
                'user_id' => auth()->id(),
                'mobil_id' => $mobil->id,
                'tanggal_sewa' => $request->tanggal_mulai,
                'tanggal_kembali' => $request->tanggal_kembali,
                'status' => 'disewa'
            ]);
            $mobil->update(['status' => 'disewa']);
            $sewa->load('user', 'mobil');
        });

        return response()->json([
            'message' => 'Mobil berhasil disewa! Silakan hubungi admin untuk proses lebih lanjut.',
            'data' => $sewa
        ], 201);
    }


    public function riwayat()
    {
        $userId = auth()->id();

        $riwayatSewa = Sewa::with([
                                'user:id,first_name,last_name', 
                                'mobil:id,merek,tipe',
                                'review'
                            ])
                            ->where('user_id', $userId)
                            ->latest()
                            ->get();

        return response()->json($riwayatSewa);
    }


    public function complete(Sewa $sewa)
    {
        if ($sewa->status === 'selesai') {
            return response()->json(['message' => 'Penyewaan ini sudah selesai.'], 409);
        }

        DB::transaction(function () use ($sewa) {
            $sewa->update([
                'status' => 'selesai',
                'tanggal_kembali' => now()
            ]);
            $sewa->mobil->update(['status' => 'ready']);
        });

        return response()->json(['message' => 'Penyewaan berhasil diselesaikan. Mobil kini tersedia kembali.']);
    }
}
