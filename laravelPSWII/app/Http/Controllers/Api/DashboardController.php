<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\ApiResponseResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Permohonan;
use App\Models\ObjekRetribusi;

class UserController extends Controller
{
    // Tampilkan semua user (termasuk soft-deleted jika diinginkan)
    public function index()
    {
        $users = User::all();

        return ApiResponseResource::success('Daftar user berhasil diambil', $users);
    }

    // Tampilkan 1 user berdasarkan id
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return ApiResponseResource::error('User tidak ditemukan');
        }

        return ApiResponseResource::success('Data user berhasil ditemukan', $user);
    }

    // Buat user baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:100|unique:user,username',
            'email' => 'required|email|max:100|unique:user,email',
            'password' => 'required|string|min:6',
            'keterangan' => 'nullable|string',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'keterangan' => $validated['keterangan'] ?? null,
        ]);

        return ApiResponseResource::success('User berhasil dibuat', $user);
    }

    // Update data user
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return ApiResponseResource::error('User tidak ditemukan');
        }

        $validated = $request->validate([
            'username' => 'sometimes|string|max:100|unique:user,username,' . $user->userId . ',userId',
            'email' => 'sometimes|email|max:100|unique:user,email,' . $user->userId . ',userId',
            'password' => 'nullable|string|min:6',
            'keterangan' => 'nullable|string',
        ]);

        $user->username = $validated['username'] ?? $user->username;
        $user->email = $validated['email'] ?? $user->email;
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->keterangan = $validated['keterangan'] ?? $user->keterangan;

        $user->save();

        return ApiResponseResource::success('User berhasil diperbarui', $user);
    }

    // Soft delete user
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return ApiResponseResource::error('User tidak ditemukan');
        }

        $user->isDeleted = true;
        $user->save();

        return ApiResponseResource::success('User berhasil dihapus (soft delete)', $user);
    }

    // (Opsional) Menampilkan hanya user aktif
    public function activeUsers()
    {
        $users = User::where('isDeleted', false)->get();

        return ApiResponseResource::success('User aktif berhasil diambil', $users);
    }

    // (Opsional) Menampilkan hanya user yang sudah dihapus
    public function deletedUsers()
    {
        $users = User::where('isDeleted', true)->get();

        return ApiResponseResource::success('User yang dihapus berhasil diambil', $users);
    }

    
}class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_user' => User::count(),
            'permohonan_aktif' => Permohonan::where('status', 'Proses')->count(),
            'objek_retribusi' => ObjekRetribusi::count()
        ]);
    }
}

// File: app/Models/Permohonan.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permohonan extends Model
{
    protected $fillable = [
        'nama_pemohon', 'jenis_permohonan', 'objek_retribusi', 'tanggal_pengajuan', 'status'
    ];
}


