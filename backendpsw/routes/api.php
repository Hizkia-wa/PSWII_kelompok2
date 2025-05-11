<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\API\JenisJangkaWaktuController;
use App\Http\Controllers\Api\JangkaWaktuSewaController;
use App\Http\Controllers\Api\LokasiObjekRetribusiController;
use App\Http\Controllers\Api\JenisObjekRetribusiController;

Route::apiResource('jenis-objek-retribusi', JenisObjekRetribusiController::class);
Route::apiResource('lokasi-objek-retribusi', LokasiObjekRetribusiController::class);
Route::post('lokasi-objek-retribusi/{id}/restore', [LokasiObjekRetribusiController::class, 'restore']);
Route::apiResource('jangka-waktu-sewa', JangkaWaktuSewaController::class);
Route::apiResource('/jenis-jangka-waktu', JenisJangkaWaktuController::class);
Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::get('/users', [UserController::class, 'index']);

