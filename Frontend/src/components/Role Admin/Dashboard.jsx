import React, { useState, useEffect, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "../dashboard/Sidebar";
import HeaderDashboard from "../dashboard/HeaderDashboard";
import NewsForm from "../dashboard/NewsForm";
import NewsList from "../dashboard/NewsList";
import { deleteNewsData, getNewsData, uploadNews } from "../../../app/service/newsService";

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const [activeMenu, setActiveMenu] = useState("create");

   const fetchNews = async () => {
      try {
        const data = await getNewsData();
        setNews(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchNews();
  }, []);

  const deleteNews = useCallback(async (id) => {
   try {
    await deleteNewsData(id);
    toast.success("Berita berhasil dihapus");
    fetchNews();
   } catch (error) {
    
   }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-40">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen flex flex-col">
        <HeaderDashboard />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                {activeMenu === "create" ? "Create Berita" : "List Berita"}
              </h1>
              <p className="text-orange-600 mt-1">
                {activeMenu === "create"
                  ? "Tambah berita baru untuk ditampilkan di website"
                  : "Kelola semua berita yang telah dibuat"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {activeMenu === "create" && (
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                    <NewsForm onSuccess={fetchNews} />
                  </div>
                </div>
              )}

              {activeMenu === "list" && (
                <div className="lg:col-span-3">
                  <NewsList news={news} onDelete={deleteNews} />
                </div>
              )}

              {activeMenu === "create" && (
                <div className="lg:col-span-1">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <h3 className="font-semibold text-orange-800 mb-3">
                      💡 Tips Menulis Berita
                    </h3>
                    <ul className="space-y-2 text-sm text-orange-700">
                      <li>• Gunakan judul yang menarik perhatian</li>
                      <li>• Pastikan konten informatif dan mudah dipahami</li>
                      <li>• Gunakan gambar berkualitas tinggi</li>
                      <li>• Periksa ejaan dan tata bahasa</li>
                      <li>• Maksimal ukuran gambar 2MB</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
