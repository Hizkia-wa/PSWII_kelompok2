<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JenisPermohonanController;

Route::apiResource('jenis-permohonan', JenisPermohonanController::class);
Route::get('/users', [UserController::class, 'index']);

