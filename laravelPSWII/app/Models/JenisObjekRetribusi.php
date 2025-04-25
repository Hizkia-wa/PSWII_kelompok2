<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisObjekRetribusi extends Model
{
    protected $table = 'jenisObjekRetribusi';
    protected $primaryKey = 'idJenisObjekRetribusi';
    protected $fillable = ['jenisObjekRetribusi', 'keterangan', 'isDeleted'];
}
