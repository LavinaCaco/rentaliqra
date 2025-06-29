<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mobil;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;


class MobilController extends Controller
{
    public function index(Request $request)
    {
        $query = Mobil::query();

        if ($request->filled('tipe')) {
            $query->where('tipe', $request->tipe);
        }

        if ($request->filled('harga')) {
            switch ($request->harga) {
                case '<300k':
                    $query->where('harga', '<', 300000);
                    break;
                case '300k-500k':
                    $query->whereBetween('harga', [300000, 500000]);
                    break;
                case '>500k':
                    $query->where('harga', '>', 500000);
                    break;
            }
        }
        
        $mobils = $query->latest()->get();
        return response()->json($mobils, 200);
    }

    public function show(Mobil $mobil)
    {
        $mobil->load(['reviews' => function ($query)
        {
        $query->with('user:id,first_name,last_name')->latest();
        }]);

        return response()->json($mobil, 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'merek' => 'required|string|max:255',
            'tipe' => ['required', Rule::in(['SUV', 'MPV', 'City Car'])],
            'seat' => 'required|integer',
            'harga' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'foto_depan' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'foto_belakang' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'foto_samping' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'foto_dalam' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->except(['foto_depan', 'foto_belakang', 'foto_samping', 'foto_dalam']);

        $fotoFields = ['foto_depan', 'foto_belakang', 'foto_samping', 'foto_dalam'];
        foreach ($fotoFields as $field) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $namaFoto = str_replace(' ', '-', $request->merek) . '-' . $field . '-' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/mobil', $namaFoto);
                $data[$field] = $namaFoto;
            }
        }
        
        $mobil = Mobil::create($data);

        $mobil->refresh();

        return response()->json([
            'message' => 'Data mobil berhasil ditambahkan!',
            'data' => $mobil
        ], 201);
    }

    public function update(Request $request, Mobil $mobil)
    {
        $validator = Validator::make($request->all(), [
            'merek' => 'required|string|max:255',
            'tipe' => ['required', Rule::in(['SUV', 'MPV', 'City Car'])],
            'seat' => 'required|integer',
            'harga' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'foto_depan' => 'nullable|image|max:2048',
            'foto_belakang' => 'nullable|image|max:2048',
            'foto_samping' => 'nullable|image|max:2048',
            'foto_dalam' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $updateData = $request->except(['foto_depan', 'foto_belakang', 'foto_samping', 'foto_dalam']);

        $fotoFields = ['foto_depan', 'foto_belakang', 'foto_samping', 'foto_dalam'];
        foreach ($fotoFields as $field) {
            if ($request->hasFile($field)) {
                if ($mobil->$field) {
                    Storage::delete('public/mobil/' . $mobil->$field);
                }
                $file = $request->file($field);
                $namaFoto = str_replace(' ', '-', $request->merek) . '-' . $field . '-' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/mobil', $namaFoto);
                $updateData[$field] = $namaFoto;
            }
        }

        $mobil->update($updateData);


        $mobil->refresh();

        return response()->json([
            'message' => 'Data mobil berhasil diperbarui!',
            'data' => $mobil
        ], 200);
    }


    public function delete(Mobil $mobil)
    {
        $fotoColumns = ['foto_depan', 'foto_belakang', 'foto_samping', 'foto_dalam'];
        foreach ($fotoColumns as $column) {
            if ($mobil->$column) {
                Storage::delete('public/mobil/' . $mobil->$column);
            }
        }

        $mobil->delete();

        return response()->json([
            'message' => 'Data mobil berhasil dihapus!'
        ], 200);
    }
}