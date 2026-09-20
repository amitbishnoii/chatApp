import axios from "axios";
import { handleError } from "./authService";

const userApi = axios.create({
    baseURL: "http://localhost:3000/api/user",
});

export const setupService = async (data: FormData, accessToken: string) => {
    try {
        const response = await userApi.post("/setup-profile", data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
