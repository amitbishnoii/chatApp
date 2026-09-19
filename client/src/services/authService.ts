import axios from "axios";
import type { SignUpForm } from "../pages/SignUp";

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

export const SignUpService = async (data: SignUpForm) => {
    try {
        const response = await authApi.post("/signup", data);
        console.log("response: ", response);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            return "Network Error, try again later";
        }
    }
};
