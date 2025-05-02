<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permohonan extends Model
{
    protected $fillable = [
        'nama_pemohon', 'jenis_permohonan', 'objek_retribusi', 'tanggal_pengajuan', 'status'
    ];
}
