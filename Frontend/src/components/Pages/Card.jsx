import React from "react";
import { useNavigate } from "react-router-dom";
import useBerita from "../../../hooks/useBerita";

export default function Card() {
  const navigate = useNavigate();
  const { berita, loading } = useBerita();

  const getImageUrl = (gambarPath) => {
    if (!gambarPath) return "/placeholder-image.jpg";

    const baseUrl = "http://localhost:8000";
    const cleanPath = gambarPath.startsWith("berita/")
      ? gambarPath
      : `berita/${gambarPath}`;

    return `${baseUrl}/storage/${cleanPath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const handleCardClick = (id) => {
    navigate(`/berita/${id}`);
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-blue-200 shadow-md overflow-hidden transform transition-all duration-300"
        >
          <div className="w-full h-52 bg-gray-300 animate-pulse"></div>
          <div className="p-5">
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-24 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Artikel
        </h1>
        <div className="w-24 h-1 bg-blue-400 mt-2 rounded-full"></div>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {berita.map((item, index) => (
            <div
              onClick={() => handleCardClick(item.id)}
              key={item.id}
              className="bg-blue-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group"
            >
              <div className="overflow-hidden">
                <img
                  src={getImageUrl(item.gambar)}
                  alt={item.judul}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-gray-900 text-lg font-semibold leading-tight line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                  {item.judul}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  {formatDate(item.created_at)}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && berita.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            Tidak ada artikel tersedia
          </div>
        </div>
      )}
    </section>
  );
}
