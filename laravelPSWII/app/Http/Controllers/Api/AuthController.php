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
        // Validasi
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // 🔐 Hardcoded admin login
        if (
            $request->username === 'admin@tapatupa.id' &&
            $request->password === 'admin123'
        ) {
            $adminUser = [
                'id' => 0,
                'name' => 'Administrator',
                'username' => 'admin@tapatupa.id',
                'role' => 'admin',
            ];

            $token = base64_encode('admin-token');

            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil (admin)',
                'token' => $token,
                'user' => $adminUser,
            ]);
        }

        // Login user biasa dari database
        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kredensial tidak valid',
            ], 401);
        }

        $token = $user->createToken('login-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user,
        ]);
    }
}
