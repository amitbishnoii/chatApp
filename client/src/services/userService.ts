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

export const addFriendService = async (
    data: { reqSenderId: string; reqReceiverId: string },
    accessToken: string,
) => {
    try {
        const response = await userApi.post("/add-friend", data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("response: ", response);
    } catch (error) {
        return handleError(error);
    }
};

export const findUserService = async (
    username: string,
    accessToken: string,
) => {
    try {
        const response = await userApi.get(`/u/${username}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("response: ", response);
    } catch (error) {
        return handleError(error);
    }
};

export const fetchFriendsService = async (id: string, accessToken: string) => {
    try {
        const response = await userApi.get(`/friends/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.users;
    } catch (error) {
        return handleError(error);
    }
};
