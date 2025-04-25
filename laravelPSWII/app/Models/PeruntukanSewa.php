<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeruntukanSewa extends Model
{
    protected $table = 'peruntukanSewa';
    protected $primaryKey = 'idPeruntukanSewa';
    protected $fillable = ['jenisKegiatan', 'peruntukanSewa', 'keterangan', 'isDeleted'];
}
