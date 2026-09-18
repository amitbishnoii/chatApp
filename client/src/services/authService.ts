import axios from "axios";

const authApi = axios.create({
    baseURL: `http://localhost:3000/api/auth`,
});

export const LoginService = async (data: {
    username: string;
    password: string;
}) => {
    try {
        const response = await authApi.post("/login", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            return "Network Issue, Try again later!";
        }
    }
};
