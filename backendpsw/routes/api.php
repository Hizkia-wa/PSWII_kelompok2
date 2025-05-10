<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\API\JenisJangkaWaktuController;

Route::apiResource('/jenis-jangka-waktu', JenisJangkaWaktuController::class);
Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::get('/users', [UserController::class, 'index']);

