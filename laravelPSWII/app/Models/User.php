<?php

     namespace App\Models;

     use Illuminate\Database\Eloquent\Model;
     use Illuminate\Database\Eloquent\SoftDeletes;

     class User extends Model
     {
         use SoftDeletes;

         protected $table = 'user';
         protected $primaryKey = 'idUser';
         protected $fillable = [
             'idUserRole',
             'username',
             'password',
             'token',
             'email',
             'ketergangan',
             'status',
         ];

         public function userRole()
         {
             return $this->belongsTo(UserRole::class, 'idUserRole', 'idUserRole');
         }
     }