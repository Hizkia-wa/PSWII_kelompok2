<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermohonanSewa extends Model
{
    protected $table = 'permohonanSewa';
    protected $primaryKey = 'idPermohonanSewa';
    protected $fillable = [
        'idJenisPermohonan', 'nomorSuratPermohonan', 'tanggalPengajuan', 'namaPemohon',
        'alamatPemohon', 'idTarifObjekRetribusi', 'isDeleted'
    ];
}