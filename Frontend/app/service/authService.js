import fetchApi from "../axiosInstance";

export const LoginApp = async (email, password) => {
    try {
        const res = await fetchApi.post("/login", {
            email,
            password
        });
        return res;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const Logout = async () => {
    try {
        const res = await fetchApi.post("/logout");
        return res;
    } catch (error) {
        console.error(error)
        throw error;
    }
}