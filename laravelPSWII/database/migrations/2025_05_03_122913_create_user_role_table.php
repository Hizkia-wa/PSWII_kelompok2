<?php

     use Illuminate\Database\Migrations\Migration;
     use Illuminate\Database\Schema\Blueprint;
     use Illuminate\Support\Facades\Schema;

     class CreateUserRoleTable extends Migration
     {
         public function up()
         {
             Schema::create('userRole', function (Blueprint $table) {
                 $table->id('idUserRole');
                 $table->string('ketergangan');
                 $table->timestamps();
                 $table->softDeletes();
             });
         }

         public function down()
         {
             Schema::dropIfExists('userRole');
         }
     }