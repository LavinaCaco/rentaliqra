<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Sewa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['user:id,first_name,last_name', 'mobil:id,merek,tipe'])
                    ->latest()
                    ->get();

        return response()->json($reviews);
    }


    public function store(Request $request, Sewa $sewa)
    {
        if ($sewa->user_id !== auth()->id()) {
            return response()->json(['message' => 'Anda tidak diizinkan mereview penyewaan ini.'], 403);
        }
        if ($sewa->status !== 'selesai') {
            return response()->json(['message' => 'Anda hanya bisa mereview penyewaan yang sudah selesai.'], 403);
        }
        if ($sewa->review) {
            return response()->json(['message' => 'Anda sudah pernah memberikan review untuk penyewaan ini.'], 409);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $review = Review::create([
            'sewa_id' => $sewa->id,
            'user_id' => auth()->id(),
            'mobil_id' => $sewa->mobil_id,
            'rating' => $request->rating,
            'komentar' => $request->komentar,
        ]);

        return response()->json(['message' => 'Terima kasih atas review Anda!', 'data' => $review], 201);
    }
}
