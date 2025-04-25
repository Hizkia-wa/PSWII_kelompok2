<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisJangkaWaktu extends Model
{
    protected $table = 'jenisJangkaWaktu';
    protected $primaryKey = 'idJenisJangkaWaktu';
    protected $fillable = ['jenisJangkaWaktu', 'keterangan', 'isDeleted'];
}
