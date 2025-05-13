import { useState } from "react";

const FormEditJenisJangkaWaktu = () => {
  // Mock data to simulate fetched data (in a real app this would come from params/API)
  const [jenisJangkaWaktu, setJenisJangkaWaktu] = useState("Bulanan");
  const [keterangan, setKeterangan] = useState("Pembayaran dilakukan setiap bulan");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API update
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }, 800);
  };

  const handleCancel = () => {
    // In a real app, this would navigate back
    alert("Kembali ke halaman sebelumnya");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Edit Jenis Jangka Waktu
      </h2>
      
      <div className="space-y-6">
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2" 
            htmlFor="jenisJangkaWaktu"
          >
            Jenis Jangka Waktu
          </label>
          <input
            id="jenisJangkaWaktu"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={jenisJangkaWaktu}
            onChange={(e) => setJenisJangkaWaktu(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label 
            className="block text-sm font-medium text-gray-700 mb-2" 
            htmlFor="keterangan"
          >
            Keterangan
          </label>
          <textarea
            id="keterangan"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32 resize-y"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            type="button" 
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200"
            onClick={handleCancel}
          >
            Batal
          </button>
          <button 
            type="button" 
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center justify-center min-w-24"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Update"}
          </button>
        </div>
        
        {isSubmitted && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            Data berhasil diupdate.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormEditJenisJangkaWaktu;