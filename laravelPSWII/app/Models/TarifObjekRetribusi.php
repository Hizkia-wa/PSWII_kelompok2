<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TarifObjekRetribusi extends Model
{
    protected $table = 'tarifObjekRetribusi';
    protected $primaryKey = 'idTarifObjekRetribusi';
    protected $fillable = [
        'idObjekRetribusi', 'idJenisJangkaWaktu', 'tanggalDinilai', 'namaPenilai',
        'nominalTarif', 'fileTarif', 'keterangan', 'fileHasilPenilaian', 'isDefault', 'isDeleted'
    ];
}