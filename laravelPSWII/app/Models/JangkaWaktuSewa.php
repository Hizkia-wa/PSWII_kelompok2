<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JangkaWaktuSewa extends Model
{
    protected $table = 'jangkaWaktuSewa';
    protected $primaryKey = 'idJangkaWaktuSewa';
    protected $fillable = [
        'idJenisJangkaWaktu', 'jangkaWaktuSewa', 'keterangan', 'isDefault', 'isDeleted'
    ];
}

