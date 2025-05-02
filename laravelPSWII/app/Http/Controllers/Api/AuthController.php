<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // ✅ Validasi input: username dan password wajib ada
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // ✅ Cek user berdasarkan username
        $user = User::where('username', $request->username)->first();

        // ❌ Jika user tidak ditemukan atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Kredensial tidak valid',
            ], 401);
        }

        // ✅ Buat token login
        $token = $user->createToken('admin-token')->plainTextToken;

        // ✅ Balasan sukses
        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user,
        ]);
    }
}
