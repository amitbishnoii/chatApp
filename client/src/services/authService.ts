import axios from "axios";
import type { SignUpForm } from "../pages/SignUp";

const authApi = axios.create({
    baseURL: `http://localhost:3000/api/auth`,
});

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
    } else if (axios.isAxiosError(error) && error.request) {
        return "Network Error, try again later";
    } else {
        console.log("error: ", error);
        return "Unknown Error!";
    }
};

export const LoginService = async (data: {
    username: string;
    password: string;
}) => {
    try {
        const response = await authApi.post("/login", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const SignUpService = async (data: SignUpForm) => {
    try {
        const response = await authApi.post("/signup", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
