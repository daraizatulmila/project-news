import fetchApi from "../axiosInstance";

export const uploadNews = async (data) => {
  try {
    const formData = new FormData();

    formData.append("judul", data.judul);
    formData.append("deskripsi", data.deskripsi);

    if (data.gambar) {
      formData.append("gambar", data.gambar);
    }

    const res = await fetchApi.post("/berita", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Upload error:", error.response?.data);
    throw error;
  }
};

export const getNewsData = async () => {
  try {
    const res = await fetchApi.get("/berita");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNewsData = async (id) => {
  try {
    const res = await fetchApi.delete(`/berita/${id}`, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNews = async (id, data) => {
  try {
    const res = await fetchApi.post(`/berita/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}