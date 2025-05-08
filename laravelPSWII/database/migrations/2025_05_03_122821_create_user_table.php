<?php

     use Illuminate\Database\Migrations\Migration;
     use Illuminate\Database\Schema\Blueprint;
     use Illuminate\Support\Facades\Schema;

     class CreateUserTable extends Migration
     {
         public function up()
         {
             if (!Schema::hasTable('user')) {
                 Schema::create('user', function (Blueprint $table) {
                     $table->id('idUser');
                     $table->unsignedBigInteger('idUserRole');
                     $table->string('username');
                     $table->string('password');
                     $table->string('token')->nullable();
                     $table->string('email');
                     $table->string('ketergangan');
                     $table->enum('status', ['Aktif', 'Non Aktif'])->default('Aktif');
                     $table->timestamps();
                     $table->softDeletes();

                     $table->foreign('idUserRole')->references('idUserRole')->on('userRole')->onDelete('cascade');
                 });
             }
         }

         public function down()
         {
             Schema::dropIfExists('user');
         }
     }