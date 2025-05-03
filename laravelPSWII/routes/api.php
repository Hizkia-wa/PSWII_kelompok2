<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\PermohonanController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JenisPermohonanController;


Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', App\Http\Controllers\API\UserController::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/permohonan', [PermohonanController::class, 'index']);
    Route::post('/permohonan', [PermohonanController::class, 'store']);
    Route::get('/permohonan/{id}', [PermohonanController::class, 'show']);
    Route::put('/permohonan/{id}', [PermohonanController::class, 'update']);
    Route::delete('/permohonan/{id}', [PermohonanController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
});
