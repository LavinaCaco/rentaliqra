<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sewa;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon; 
use Illuminate\Validation\Rule; 

class SewaController extends Controller
{
    public function index(Request $request)
    {
        $query = Sewa::query();

        $query->with(['user:id,first_name,last_name', 'mobil:id,merek,tipe']);

        $query->latest();

        $perPage = $request->input('per_page', 6);

        $sewaList = $query->paginate($perPage);

        return response()->json($sewaList, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobil_id' => 'required|exists:mobil,id',
            'tanggal_mulai' => 'required|date|after_or_equal:today',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mobil = Mobil::find($request->mobil_id);

        if (!$mobil || $mobil->status !== 'ready') {
            return response()->json(['message' => 'Mobil ini sedang tidak tersedia untuk disewa.'], 409);
        }

        $sewa = null;

        DB::transaction(function () use ($request, $mobil, &$sewa) {
            $tanggalMulai = Carbon::parse($request->tanggal_mulai);
            $tanggalKembali = Carbon::parse($request->tanggal_kembali);
            $jumlahHari = $tanggalMulai->diffInDays($tanggalKembali) + 1; 
            
            $totalHarga = $jumlahHari * $mobil->harga; 

            $sewa = Sewa::create([
                'user_id' => auth()->id(),
                'mobil_id' => $mobil->id,
                'tanggal_sewa' => $request->tanggal_mulai,
                'tanggal_kembali' => $request->tanggal_kembali,
                'total_harga' => $totalHarga, 
                'status' => 'pending'
            ]);

            $mobil->update(['status' => 'disewa']);
            $sewa->load('user', 'mobil');
        });

        return response()->json([
            'message' => 'Permintaan sewa berhasil diajukan! Menunggu konfirmasi admin.',
            'data' => $sewa
        ], 201);
    }


    public function updateStatus(Request $request, Sewa $sewa)
    {
        $validator = Validator::make($request->all(), [
            'status' => ['required', Rule::in(['pending', 'approved', 'completed', 'cancelled'])],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        DB::transaction(function () use ($request, $sewa) {
            $oldStatus = $sewa->status;
            $newStatus = $request->status;

            $sewa->status = $newStatus;
            
            if ($newStatus === 'completed' && !$sewa->tanggal_kembali_aktual) {
                $sewa->tanggal_kembali_aktual = now();
            }
            $sewa->save();

            $mobil = Mobil::find($sewa->mobil_id);
            if ($mobil) {
                if ($newStatus === 'completed' || $newStatus === 'cancelled') {
                    $mobil->update(['status' => 'ready']);
                } elseif ($newStatus === 'approved' && $oldStatus === 'pending') {
                    $mobil->update(['status' => 'disewa']);
                }
            }
        });

        return response()->json(['message' => 'Status sewa berhasil diperbarui!', 'data' => $sewa->load('user', 'mobil')], 200);
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
}
