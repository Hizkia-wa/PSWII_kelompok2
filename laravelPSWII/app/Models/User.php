<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
    protected $primaryKey = 'userId';
    protected $fillable = [
        'username', 'password', 'token', 'email', 'keterangan', 'isDeleted'
    ];
}
