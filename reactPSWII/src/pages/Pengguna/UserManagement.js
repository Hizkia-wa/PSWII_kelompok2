import React, { useState, useEffect } from 'react';
     import axios from 'axios';

     const UserManagement = () => {
       const [users, setUsers] = useState([]);
       const [formData, setFormData] = useState({ idUserRole: '', username: '', email: '', password: '', token: '', status: 'Aktif', ketergangan: '' });
       const [isEdit, setIsEdit] = useState(false);
       const [selectedUserId, setSelectedUserId] = useState(null);
       const [showDetail, setShowDetail] = useState(false);
       const [error, setError] = useState(null);
       const [token, setToken] = useState(localStorage.getItem('token') || '');

       useEffect(() => {
         fetchUsers();
       }, []);

       const fetchUsers = async () => {
         try {
           const response = await axios.get('http://localhost:8000/api/users', {
             headers: { Authorization: `Bearer ${token}` },
           });
           setUsers(response.data);
         } catch (error) {
           setError('Error fetching users: ' + (error.response?.data?.message || error.message));
           console.error('Error fetching users:', error.response || error);
         }
       };

       const handleInputChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };

       const handleAddUser = async (e) => {
         e.preventDefault();
         try {
           const response = await axios.post('http://localhost:8000/api/users', {
             idUserRole: formData.idUserRole,
             username: formData.username,
             email: formData.email,
             password: formData.password,
             token: formData.token,
             status: formData.status,
             ketergangan: formData.ketergangan,
           }, {
             headers: { Authorization: `Bearer ${token}` },
           });
           fetchUsers();
           setFormData({ idUserRole: '', username: '', email: '', password: '', token: '', status: 'Aktif', ketergangan: '' });
           setError(null);
         } catch (error) {
           setError('Error adding user: ' + error.response?.data?.message || error.message);
           console.error('Error adding user:', error.response?.data || error);
         }
       };

       const handleEditUser = async (e) => {
         e.preventDefault();
         try {
           await axios.put(`http://localhost:8000/api/users/${selectedUserId}`, {
             idUserRole: formData.idUserRole,
             username: formData.username,
             email: formData.email,
             password: formData.password,
             token: formData.token,
             status: formData.status,
             ketergangan: formData.ketergangan,
           }, {
             headers: { Authorization: `Bearer ${token}` },
           });
           fetchUsers();
           setFormData({ idUserRole: '', username: '', email: '', password: '', token: '', status: 'Aktif', ketergangan: '' });
           setIsEdit(false);
           setSelectedUserId(null);
           setError(null);
         } catch (error) {
           setError('Error editing user: ' + error.response?.data?.message || error.message);
           console.error('Error editing user:', error.response?.data || error);
         }
       };

       const handleDeleteUser = async (id) => {
         try {
           await axios.delete(`http://localhost:8000/api/users/${id}`, {
             headers: { Authorization: `Bearer ${token}` },
           });
           fetchUsers();
           setError(null);
         } catch (error) {
           setError('Error deleting user: ' + error.message);
           console.error('Error deleting user:', error);
         }
       };

       const handleEditClick = (user) => {
         setFormData({
           idUserRole: user.idUserRole,
           username: user.username,
           email: user.email,
           password: '',
           token: user.token,
           status: user.status,
           ketergangan: user.ketergangan,
         });
         setIsEdit(true);
         setSelectedUserId(user.idUser);
       };

       const handleDetailClick = (user) => {
         setFormData({
           idUserRole: user.idUserRole,
           username: user.username,
           email: user.email,
           password: '',
           token: user.token,
           status: user.status,
           ketergangan: user.ketergangan,
         });
         setShowDetail(true);
         setSelectedUserId(user.idUser);
       };

       // Set the token (replace with actual logic to get token, e.g., from login)
       useEffect(() => {
         const savedToken = localStorage.getItem('token');
         if (savedToken) {
           setToken(savedToken);
         } else {
           const newToken = '2|your-generated-token-here'; // Replace with the token from Sanctum
           setToken(newToken);
           localStorage.setItem('token', newToken);
         }
       }, []);

       return (
         <div className="container mx-auto p-4">
           <h2 className="text-2xl font-bold mb-4">Data User</h2>
           <div className="flex justify-end mb-4">
             <button
               onClick={() => {
                 setFormData({ idUserRole: '', username: '', email: '', password: '', token: '', status: 'Aktif', ketergangan: '' });
                 setIsEdit(false);
               }}
               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
             >
               Tambah User
             </button>
           </div>
           {error && <div className="text-red-500 mb-4">{error}</div>}
           <table className="w-full border-collapse border border-gray-300">
             <thead>
               <tr className="bg-gray-800 text-white">
                 <th className="border p-2">No</th>
                 <th className="border p-2">Token</th>
                 <th className="border p-2">Username</th>
                 <th className="border p-2">Email</th>
                 <th className="border p-2">Ketergangan</th>
                 <th className="border p-2">Status</th>
                 <th className="border p-2">Aksi</th>
               </tr>
             </thead>
             <tbody>
               {users.map((user, index) => (
                 <tr key={user.idUser} className="border">
                   <td className="border p-2">{index + 1}</td>
                   <td className="border p-2">{user.token}</td>
                   <td className="border p-2">{user.username}</td>
                   <td className="border p-2">{user.email}</td>
                   <td className="border p-2">{user.ketergangan}</td>
                   <td className="border p-2">{user.status}</td>
                   <td className="border p-2 flex space-x-2">
                     <button
                       onClick={() => handleDetailClick(user)}
                       className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                     >
                       Detail
                     </button>
                     <button
                       onClick={() => handleEditClick(user)}
                       className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => handleDeleteUser(user.idUser)}
                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                     >
                       Hapus
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>

           {(isEdit || (!showDetail && !selectedUserId)) && (
             <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
               <div className="bg-white p-6 rounded shadow-lg w-96">
                 <h3 className="text-xl font-bold mb-4">{isEdit ? 'Edit User' : 'Tambah User'}</h3>
                 <form onSubmit={isEdit ? handleEditUser : handleAddUser}>
                   <div className="mb-4">
                     <label className="block text-gray-700">Username</label>
                     <input
                       type="text"
                       name="username"
                       value={formData.username}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Masukkan username"
                       required
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-700">Email</label>
                     <input
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Masukkan Email"
                       required
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-700">Password</label>
                     <input
                       type="password"
                       name="password"
                       value={formData.password}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Masukkan Password"
                       required={!isEdit}
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-700">Token</label>
                     <input
                       type="text"
                       name="token"
                       value={formData.token}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Masukkan Token"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-700">Status</label>
                     <select
                       name="status"
                       value={formData.status}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                       <option value="Aktif">Aktif</option>
                       <option value="Non Aktif">Non Aktif</option>
                     </select>
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-700">Ketergangan</label>
                     <input
                       type="text"
                       name="ketergangan"
                       value={formData.ketergangan}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Masukkan Ketergangan"
                       required
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-700">Role</label>
                     <input
                       type="text"
                       name="idUserRole"
                       value={formData.idUserRole}
                       onChange={handleInputChange}
                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Masukkan ID Role"
                       required
                     />
                   </div>
                   <div className="flex justify-end space-x-2">
                     <button
                       type="button"
                       onClick={() => {
                         setIsEdit(false);
                         setSelectedUserId(null);
                         setFormData({ idUserRole: '', username: '', email: '', password: '', token: '', status: 'Aktif', ketergangan: '' });
                         setError(null);
                       }}
                       className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                     >
                       Batal
                     </button>
                     <button
                       type="submit"
                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                     >
                       Simpan
                     </button>
                   </div>
                 </form>
               </div>
             </div>
           )}

           {showDetail && selectedUserId && (
             <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
               <div className="bg-white p-6 rounded shadow-lg w-96">
                 <h3 className="text-xl font-bold mb-4">Detail User</h3>
                 <div className="mb-4">
                   <label className="block text-gray-700">Username</label>
                   <input
                     type="text"
                     value={formData.username}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100"
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-gray-700">Email</label>
                   <input
                     type="text"
                     value={formData.email}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100"
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-gray-700">Token</label>
                   <input
                     type="text"
                     value={formData.token}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100"
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-gray-700">Status</label>
                   <input
                     type="text"
                     value={formData.status}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100"
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-gray-700">Ketergangan</label>
                   <input
                     type="text"
                     value={formData.ketergangan}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100"
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-gray-700">Role</label>
                   <input
                     type="text"
                     value={formData.idUserRole}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100"
                   />
                 </div>
                 <div className="flex justify-end">
                   <button
                     onClick={() => {
                       setShowDetail(false);
                       setSelectedUserId(null);
                     }}
                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                   >
                     Tutup
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>
       );
     };

     export default UserManagement;