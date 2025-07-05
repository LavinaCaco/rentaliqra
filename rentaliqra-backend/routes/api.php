<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\MobilController;
use App\Http\Controllers\Api\SewaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// RUTE PUBLIK 
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/mobil', [MobilController::class, 'index']);
Route::get('/mobil/{mobil}', [MobilController::class, 'show']);
Route::get('/reviews', [ReviewController::class, 'index']);


// RUTE PENGGUNA YANG SUDAH LOGIN 
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::post('/sewa', [SewaController::class, 'store']);
    Route::get('/pesanan-saya', [SewaController::class, 'riwayat']);
    Route::get('/riwayat', [SewaController::class, 'riwayat'])->middleware('auth:sanctum');

    Route::post('/sewa/{sewa}/reviews', [ReviewController::class, 'store']);
});


// RUTE ADMIN 
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {

    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);

    // manajemen user
    Route::post('/users', [UserController::class, 'addadmin']);
    Route::apiResource('/users', UserController::class)->except(['store']);
    
    // manajemen mobil
    Route::post('/mobil', [MobilController::class, 'store']);
    Route::post('/mobil/{mobil}', [MobilController::class, 'update']);
    Route::delete('/mobil/{mobil}', [MobilController::class, 'delete']);
    
    // manajemen sewa
    Route::get('/sewa', [SewaController::class, 'index']);
    Route::put('/sewa/{sewa}/status', [SewaController::class, 'updateStatus'])->middleware('auth:sanctum');
});
