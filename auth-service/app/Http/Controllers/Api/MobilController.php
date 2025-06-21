<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mobil;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MobilController extends Controller
{

    public function index()
    {
        $mobils = Mobil::latest()->get();
        return response()->json($mobils, 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'merek' => 'required|string|max:255',
            'seat' => 'required|integer',
            'harga' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $namaFoto = null;
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $namaFoto = str_replace(' ', '-', $request->merek) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/mobil', $namaFoto);
        }

        $mobil = Mobil::create([
            'merek' => $request->merek,
            'seat' => $request->seat,
            'harga' => $request->harga,
            'keterangan' => $request->keterangan,
            'foto' => $namaFoto,
        ]);

        return response()->json([
            'message' => 'Data mobil berhasil ditambahkan!',
            'data' => $mobil
        ], 201);
    }


    public function show(Mobil $mobil)
    {
        return response()->json($mobil, 200);
    }


    public function update(Request $request, Mobil $mobil)
    {
        $validator = Validator::make($request->all(), [
            'merek' => 'required|string|max:255',
            'seat' => 'required|integer',
            'harga' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $updateData = $request->except('foto');

        if ($request->hasFile('foto')) {
            if ($mobil->foto) {
                Storage::delete('public/mobil/' . $mobil->foto);
            }
            $file = $request->file('foto');
            $namaFoto = str_replace(' ', '-', $request->merek) . '-' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/mobil', $namaFoto);
            $updateData['foto'] = $namaFoto;
        }

        $mobil->update($updateData);

        return response()->json([
            'message' => 'Data mobil berhasil diperbarui!',
            'data' => $mobil
        ], 200);
    }


    public function delete(Mobil $mobil)
    {
        if ($mobil->foto) {
            Storage::delete('public/mobil/' . $mobil->foto);
        }

        $mobil->delete();

        return response()->json([
            'message' => 'Data mobil berhasil dihapus!'
        ], 200);
    }
}