import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import fetchApi from "../../../app/axiosInstance";

export default function BeritaDetail() {
  const { id } = useParams();
  const [beritaDetail, setBeritaDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBeritaDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchApi.get(`/berita/${id}`);
      setBeritaDetail(res.data);
    } catch (err) {
      setError("Gagal memuat berita");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeritaDetail();
  }, [id]);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-80 rounded-xl mb-6"></div>
          <div className="bg-gray-300 h-8 rounded mb-4"></div>
          <div className="bg-gray-300 h-4 rounded w-32 mb-6"></div>
          <div className="bg-gray-300 h-4 rounded mb-2"></div>
          <div className="bg-gray-300 h-4 rounded mb-2"></div>
          <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchBeritaDetail}
            className="bg-blue-300 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!beritaDetail) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">
            Berita tidak ditemukan
          </div>
          <Link
            to="/"
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={getImageUrl(beritaDetail.gambar)}
          alt={beritaDetail.judul}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />

        <div className="p-8">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {beritaDetail.judul}
            </h1>
            <div className="flex items-center text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">
                {formatDate(beritaDetail.created_at)}
              </span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {beritaDetail.deskripsi}
            </p>
          </div>

          <footer className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Daftar Berita
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}
