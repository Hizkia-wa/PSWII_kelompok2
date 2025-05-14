<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Akun hardcoded
        $validEmail = 'admintobalink@gmail.com';
        $hashedPassword = '$2y$10$i8odTTQsCxfGGO9hPcDlo.j7f5R3Z61MWaLTMM0WZNh7QSSF5LjyK'; // hasil dari tinker

        if ($request->email === $validEmail && Hash::check($request->password, $hashedPassword)) {
            return response()->json([
                'message' => 'Login berhasil',
                'token' => bin2hex(random_bytes(32)) // token dummy
            ]);
        }

        return response()->json(['message' => 'Email atau password salah'], 401);
    }
}
