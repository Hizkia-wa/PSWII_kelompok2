<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Permohonan;
use Illuminate\Http\Request;

class PermohonanController extends Controller
{
    public function index() {
        return Permohonan::latest()->get();
    }

    public function store(Request $request) {
        return Permohonan::create($request->all());
    }

    public function show($id) {
        return Permohonan::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $permohonan = Permohonan::findOrFail($id);
        $permohonan->update($request->all());
        return $permohonan;
    }

    public function destroy($id) {
        Permohonan::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
