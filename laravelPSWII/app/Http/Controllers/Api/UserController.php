<?php

     namespace App\Http\Controllers;

     use App\Models\User;
     use Illuminate\Http\Request;

     class UserController extends Controller
     {
         public function index()
         {
             $users = User::with('userRole')->get();
             return response()->json($users);
         }

         public function store(Request $request)
         {
             $validated = $request->validate([
                 'username' => 'required|string|max:255',
                 'email' => 'required|email|unique:user,email',
                 'token' => 'nullable|string',
                 'status' => 'required|in:Aktif,Non Aktif',
                 'ketergangan' => 'required|string',
                 'idUserRole' => 'required|exists:userRole,idUserRole',
             ]);

             $user = User::create(array_merge($validated, [
                 'password' => bcrypt($request->password ?? 'defaultpassword'),
             ]));

             return response()->json($user, 201);
         }

         public function show($id)
         {
             $user = User::with('userRole')->findOrFail($id);
             return response()->json($user);
         }

         public function update(Request $request, $id)
         {
             $user = User::findOrFail($id);

             $validated = $request->validate([
                 'username' => 'required|string|max:255',
                 'email' => 'required|email|unique:user,email,' . $id . ',idUser',
                 'token' => 'nullable|string',
                 'status' => 'required|in:Aktif,Non Aktif',
                 'ketergangan' => 'required|string',
                 'idUserRole' => 'required|exists:userRole,idUserRole',
             ]);

             if ($request->password) {
                 $validated['password'] = bcrypt($request->password);
             }

             $user->update($validated);
             return response()->json($user);
         }

         public function destroy($id)
         {
             $user = User::findOrFail($id);
             $user->delete();
             return response()->json(null, 204);
         }
     }