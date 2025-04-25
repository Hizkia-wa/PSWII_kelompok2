<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisStatus extends Model
{
    protected $table = 'jenisStatus';
    protected $primaryKey = 'idJenisStatus';
    protected $fillable = ['jenisStatus', 'keterangan', 'isDeleted'];
}
