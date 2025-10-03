import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateNews } from "../../../app/service/newsService";

export default function NewsEditForm({ newsData, onSuccess, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newsData) {
      const getImageUrl = (gambarPath) => {
        if (!gambarPath) return null;

        const baseUrls = ["http://localhost:8000", "http://127.0.0.1:8000"];

        const cleanPath = gambarPath.startsWith("berita/")
          ? gambarPath
          : `berita/${gambarPath}`;

        return `${baseUrls[0]}/storage/${cleanPath}`;
      };
      setTitle(newsData.judul || "");
      setContent(newsData.deskripsi || "");
      setPreview(getImageUrl(newsData.gambar) || null);
    }
  }, [newsData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran gambar tidak boleh lebih dari 2MB");
      e.target.value = "";
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title & Content wajib diisi");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('judul', title.trim());
      formData.append('deskripsi', content.trim());

      if (image) {
        formData.append('gambar', image);
      }
      
      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await toast.promise(updateNews(newsData.id, formData), {
        loading: "Mengupdate berita...",
        success: (res) => {
          if (onSuccess) onSuccess();
          return "Berita berhasil diupdate!";
        },
        error: (err) => {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.errors?.[0]?.message ||
            "Gagal mengupdate berita";
          return errorMessage;
        },
      });
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[80vh]">
      <h2 className="text-lg text-start font-bold mb-4">Edit News</h2>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 mb-4">
        <div className="mb-4">
          <label className="block text-sm text-start font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            placeholder="Masukkan judul berita"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 border-gray-300 focus:outline-none transition-all duration-200 ease-in-out focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-start text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            placeholder="Masukkan konten berita"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-3 resize-none border-gray-300 focus:ring-1 focus:outline-none transition-all duration-200 ease-in-out focus:ring-orange-500 focus:border-orange-500 h-32"
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-start text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2 border-gray-300"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: JPG, PNG, JPEG (Maks. 2MB) - Biarkan kosong jika tidak ingin
            mengubah gambar
          </p>
        </div>

        {/* Preview Gambar */}
        {preview && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-60 rounded-lg object-contain border border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Menyimpan..." : "Update"}
        </button>
      </div>
    </form>
  );
}