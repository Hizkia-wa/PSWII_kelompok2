<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LokasiObjekRetribusi extends Model
{
    protected $table = 'lokasiObjekRetribusi';
    protected $primaryKey = 'idLokasiObjekRetribusi';
    protected $fillable = ['lokasiObjekRetribusi', 'keterangan', 'isDeleted'];
}
