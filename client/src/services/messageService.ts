import axios from "axios";
import { handleError } from "./authService";

const messageApi = axios.create({
    baseURL: "http://localhost:3000/api/messages",
});

export const fetchMessages = async (roomID: string, accessToken: string) => {
    try {
        const response = await messageApi.get(`/get/${roomID}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("response: ", response);
    } catch (error) {
        return handleError(error);
    }
};
