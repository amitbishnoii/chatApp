import axios from "axios";
import { handleError } from "./authService";

const messageApi = axios.create({
    baseURL: "http://localhost:3000/api/messages",
});

export const fetchMessages = async (roomID: string, accessToken: string) => {
    try {
        console.log("roomid: ", roomID);
        const response = await messageApi.get(`/get/${roomID}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.data;
    } catch (error) {
        return handleError(error);
    }
};
