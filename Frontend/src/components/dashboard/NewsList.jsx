import Swal from "sweetalert2";
import { openEditNewsModal } from "./open-modal/OpenModalEdit";

export default function NewsList({ news, onDelete }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin hapus?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  const newsArray = Array.isArray(news) ? news : news?.data || [];

  const getImageUrl = (gambarPath) => {
    if (!gambarPath) return null;

    const baseUrls = ["http://localhost:8000", "http://127.0.0.1:8000"];

    const cleanPath = gambarPath.startsWith("berita/")
      ? gambarPath
      : `berita/${gambarPath}`;

    return `${baseUrls[0]}/storage/${cleanPath}`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4">News List</h2>

      {newsArray.length === 0 ? (
        <p className="text-gray-500">Belum ada berita</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50 border-gray-300 border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Gambar
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Judul
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Deskripsi
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Tanggal Dibuat
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {newsArray.map((item) => (
                <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                  {/* Kolom Gambar */}
                  <td className="py-3 px-4">
                    {item.gambar ? (
                      <img
                        src={getImageUrl(item.gambar)}
                        alt={item.judul}
                        className="w-16 h-16 object-cover rounded-sm"
                        onError={(e) => {
                          console.error("Gambar gagal dimuat:", e.target.src);
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                  </td>

                  {/* Kolom Judul */}
                  <td className="py-3 px-4">
                    <div className="max-w-xs">
                      <h3 className="font-medium text-gray-800 text-sm">
                        {item.judul}
                      </h3>
                    </div>
                  </td>

                  {/* Kolom Deskripsi */}
                  <td className="py-3 px-4">
                    <div className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.deskripsi}
                      </p>
                    </div>
                  </td>

                  {/* Kolom Tanggal */}
                  <td className="py-3 px-4">
                    <p className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>

                  {/* Kolom Aksi */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openEditNewsModal(item)}
                      className="px-5 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 ml-2 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
