<?php

// app/Http/Controllers/JenisPermohonanController.php
namespace App\Http\Controllers;

use App\Models\JenisPermohonan;
use Illuminate\Http\Request;

class JenisPermohonanController extends Controller
{
    public function index()
    {
        return JenisPermohonan::all();
    }

    public function store(Request $request)
    {
        $request->validate(['nama' => 'required']);
        return JenisPermohonan::create($request->all());
    }

    public function show($id)
    {
        return JenisPermohonan::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $jenis = JenisPermohonan::findOrFail($id);
        $jenis->update($request->all());
        return $jenis;
    }

    public function destroy($id)
    {
        JenisPermohonan::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
