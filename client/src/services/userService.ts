import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:3000/api/user",
});

export const setupService = async (data: FormData) => {
    try {
        const response = await userApi.post("/setup-profile", data);
        console.log("request sent", response);

        return response.data;
    } catch (error) {}
};
