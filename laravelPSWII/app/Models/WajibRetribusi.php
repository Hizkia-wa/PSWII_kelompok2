<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WajibRetribusi extends Model
{
    protected $table = 'wajibRetribusi';
    protected $primaryKey = 'idWajibRetribusi';
    protected $fillable = [
        'NIK', 'namaWajibRetribusi', 'pekerjaan', 'alamat', 'nomorPonsel', 'nomorWhatsapp',
        'email', 'idJenisRetribusi', 'fileFoto', 'isDeleted'
    ];
}
