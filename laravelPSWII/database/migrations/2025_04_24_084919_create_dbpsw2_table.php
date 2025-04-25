<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // user
        Schema::create('user', function (Blueprint $table) {
            $table->id('userId');
            $table->string('username', 100);
            $table->string('password');
            $table->text('token')->nullable();
            $table->string('email', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // jenisPermohonan
        Schema::create('jenisPermohonan', function (Blueprint $table) {
            $table->id('idJenisPermohonan');
            $table->unsignedBigInteger('parentId')->nullable();
            $table->enum('jenisPermohonan', ['Permohonan Baru', 'Perpanjangan', 'Pembaharuan']);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // jenisJangkaWaktu
        Schema::create('jenisJangkaWaktu', function (Blueprint $table) {
            $table->id('idJenisJangkaWaktu');
            $table->string('jenisJangkaWaktu', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // jangkaWaktuSewa
        Schema::create('jangkaWaktuSewa', function (Blueprint $table) {
            $table->id('idJangkaWaktuSewa');
            $table->unsignedBigInteger('idJenisJangkaWaktu');
            $table->foreign('idJenisJangkaWaktu')->references('idJenisJangkaWaktu')->on('jenisJangkaWaktu')->onUpdate('cascade')->onDelete('restrict');
            $table->string('jangkaWaktuSewa', 100);
            $table->text('keterangan')->nullable();
            $table->boolean('isDefault')->default(false);
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // lokasiObjekRetribusi
        Schema::create('lokasiObjekRetribusi', function (Blueprint $table) {
            $table->id('idLokasiObjekRetribusi');
            $table->string('lokasiObjekRetribusi');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // jenisObjekRetribusi
        Schema::create('jenisObjekRetribusi', function (Blueprint $table) {
            $table->id('idJenisObjekRetribusi');
            $table->string('jenisObjekRetribusi', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // objekRetribusi
        Schema::create('objekRetribusi', function (Blueprint $table) {
            $table->id('idObjekRetribusi');
            $table->unsignedBigInteger('idLokasiObjekRetribusi');
            $table->foreign('idLokasiObjekRetribusi')->references('idLokasiObjekRetribusi')->on('lokasiObjekRetribusi')->onUpdate('cascade')->onDelete('restrict');
            $table->unsignedBigInteger('idJenisObjekRetribusi');
            $table->foreign('idJenisObjekRetribusi')->references('idJenisObjekRetribusi')->on('jenisObjekRetribusi')->onUpdate('cascade')->onDelete('restrict');
            $table->string('kodeObjekRetribusi', 100);
            $table->string('noBangunan', 100);
            $table->unsignedInteger('jumlahLantai');
            $table->string('objekRetribusi', 255);
            $table->decimal('panjangTanah', 10, 2);
            $table->decimal('lebarTanah', 10, 2);
            $table->decimal('luasTanah', 10, 2);
            $table->decimal('panjangBangunan', 10, 2);
            $table->decimal('lebarBangunan', 10, 2);
            $table->decimal('luasBangunan', 10, 2);
            $table->text('alamat');
            $table->decimal('latitude', 10, 6)->nullable();
            $table->decimal('longitude', 10, 6)->nullable();
            $table->text('keterangan')->nullable();
            $table->text('gambarDenahTanah')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // jenisStatus
        Schema::create('jenisStatus', function (Blueprint $table) {
            $table->id('idJenisStatus');
            $table->enum('jenisStatus', ['Proses', 'Disetujui', 'Ditolak', 'Dibatalkan']);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // status
        Schema::create('status', function (Blueprint $table) {
            $table->id('idStatus');
            $table->unsignedBigInteger('idJenisStatus');
            $table->foreign('idJenisStatus')->references('idJenisStatus')->on('jenisStatus')->onUpdate('cascade')->onDelete('restrict');
            $table->string('namaStatus', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // peruntukanSewa
        Schema::create('peruntukanSewa', function (Blueprint $table) {
            $table->id('idPeruntukanSewa');
            $table->string('jenisKegiatan', 100);
            $table->string('peruntukanSewa', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // wajibRetribusi
        Schema::create('wajibRetribusi', function (Blueprint $table) {
            $table->id('idWajibRetribusi');
            $table->string('NIK', 16);
            $table->string('namaWajibRetribusi', 255);
            $table->string('pekerjaan', 100);
            $table->text('alamat');
            $table->string('nomorPonsel', 20)->nullable();
            $table->string('nomorWhatsapp', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->unsignedBigInteger('idJenisRetribusi')->nullable();
            $table->text('fileFoto')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // tarifObjekRetribusi
        Schema::create('tarifObjekRetribusi', function (Blueprint $table) {
            $table->id('idTarifObjekRetribusi');
            $table->unsignedBigInteger('idObjekRetribusi');
            $table->foreign('idObjekRetribusi')->references('idObjekRetribusi')->on('objekRetribusi')->onUpdate('cascade')->onDelete('restrict');
            $table->unsignedBigInteger('idJenisJangkaWaktu');
            $table->foreign('idJenisJangkaWaktu')->references('idJenisJangkaWaktu')->on('jenisJangkaWaktu')->onUpdate('cascade')->onDelete('restrict');
            $table->date('tanggalDinilai');
            $table->string('namaPenilai', 100);
            $table->decimal('nominalTarif', 15, 2);
            $table->text('fileTarif')->nullable();
            $table->text('keterangan')->nullable();
            $table->text('fileHasilPenilaian')->nullable();
            $table->boolean('isDefault')->default(false);
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });

        // permohonanSewa
        Schema::create('permohonanSewa', function (Blueprint $table) {
            $table->id('idPermohonanSewa');
            $table->unsignedBigInteger('idJenisPermohonan');
            $table->foreign('idJenisPermohonan')->references('idJenisPermohonan')->on('jenisPermohonan')->onUpdate('cascade')->onDelete('restrict');
            $table->string('nomorSuratPermohonan', 100);
            $table->date('tanggalPengajuan');
            $table->string('namaPemohon', 255);
            $table->text('alamatPemohon');
            $table->unsignedBigInteger('idTarifObjekRetribusi');
            $table->foreign('idTarifObjekRetribusi')->references('idTarifObjekRetribusi')->on('tarifObjekRetribusi')->onUpdate('cascade')->onDelete('restrict');
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permohonanSewa');
        Schema::dropIfExists('tarifObjekRetribusi');
        Schema::dropIfExists('wajibRetribusi');
        Schema::dropIfExists('peruntukanSewa');
        Schema::dropIfExists('status');
        Schema::dropIfExists('jenisStatus');
        Schema::dropIfExists('objekRetribusi');
        Schema::dropIfExists('jenisObjekRetribusi');
        Schema::dropIfExists('lokasiObjekRetribusi');
        Schema::dropIfExists('jangkaWaktuSewa');
        Schema::dropIfExists('jenisJangkaWaktu');
        Schema::dropIfExists('jenisPermohonan');
        Schema::dropIfExists('user');
    }
};
