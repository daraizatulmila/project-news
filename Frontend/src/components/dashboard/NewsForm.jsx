import React, { useState } from "react";
import toast from "react-hot-toast";
import { uploadNews } from "../../../app/service/newsService";

export default function NewsForm({onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const formData = {
        judul: title.trim(),
        deskripsi: content.trim(),
        gambar: image,
      };

      await toast.promise(uploadNews(formData), {
        loading: "Mengupload berita...",
        success: (res) => {
          setTitle("");
          setContent("");
          setImage(null);
          setPreview(null);
          if (onSuccess) onSuccess();
          return "Berita berhasil ditambahkan!";
        },
        error: (err) => {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.errors?.[0]?.message ||
            "Gagal menambahkan berita";
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
    <form
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold">Add News</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
          Format: JPG, PNG, JPEG (Maks. 2MB)
        </p>
      </div>

      {/* Preview Gambar */}
      {preview && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 rounded-lg border border-gray-200 object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isLoading ? "Menyimpan..." : "Save"}
      </button>
    </form>
  );
}
