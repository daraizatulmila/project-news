import { useEffect } from "react";
import { useState } from "react";
import fetchApi from "../app/axiosInstance";

const useBerita = () => {
    const [berita, setBerita] = useState([]);

    const getBerita = async () => {
        try {
            const res = await fetchApi.get("/berita");
            setBerita(res.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getBerita();
    })
    return { berita };
}

export default useBerita;