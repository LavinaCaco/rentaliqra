<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\MobilController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SewaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/sewa', [SewaController::class, 'store']);
    Route::get('/pesanan-saya', [SewaController::class, 'riwayat']);
});


Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::post('/users', [UserController::class, 'addadmin']);
    Route::apiResource('/users', UserController::class)->except(['store']);
    
    Route::post('/mobil', [MobilController::class, 'store']);
    Route::post('/mobil/{mobil}', [MobilController::class, 'update']);
    Route::delete('/mobil/{mobil}', [MobilController::class, 'delete']);

    Route::get('/sewa', [SewaController::class, 'index']);
    Route::post('/sewa/{sewa}/complete', [SewaController::class, 'complete']);
});


Route::get('/mobil', [MobilController::class, 'index']);
Route::get('/mobil/{mobil}', [MobilController::class, 'show']);