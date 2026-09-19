import { useForm } from "react-hook-form";
import { LoginService } from "../services/authService";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

interface LoginForm {
    username: string;
    password: string;
}

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginForm>();
    const [error, setError] = useState<string>();
    const { login } = useAuth();

    const handleForm = async (data: LoginForm) => {
        const loginRes = await LoginService(data);
        if (!loginRes.success) {
            setError(loginRes.message);
            return;
        }
        login({
            role: loginRes.userInfo.role,
            accessToken: loginRes.token,
            id: loginRes.userInfo._id,
            username: loginRes.userInfo.username,
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] px-5 py-10 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
                <div className="w-full">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Sign in to your account
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#777783]">
                            Enter your credentials to continue.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleForm)}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-[#d4d4dc]"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                {...register("username", {
                                    required: "username is required",
                                })}
                                className={`h-13 w-full rounded-xl border bg-[#111118] px-4 text-sm text-white outline-none transition placeholder:text-[#555560] focus:border-[#7c5cff] focus:bg-[#13131b] ${
                                    errors.username
                                        ? "border-red-500"
                                        : "border-[#292932]"
                                }`}
                            />

                            {errors.username && (
                                <p className="mt-2 text-xs font-medium text-red-400">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-[#d4d4dc]"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-xs font-medium text-[#7c5cff] transition hover:text-[#9b85ff]"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is Required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be atleast 8 characters.",
                                    },
                                })}
                                className={`h-13 w-full rounded-xl border bg-[#111118] px-4 text-sm text-white outline-none transition placeholder:text-[#555560] focus:border-[#7c5cff] focus:bg-[#13131b] ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-[#292932]"
                                }`}
                            />

                            {errors.password && (
                                <p className="mt-2 text-xs font-medium text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="h-13 w-full rounded-xl bg-[#7c5cff] px-4 text-sm font-semibold text-white transition hover:bg-[#6d4ff0] active:scale-[0.99]"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#22222b]" />

                        <span className="text-xs text-[#555560]">
                            Secure login
                        </span>

                        <div className="h-px flex-1 bg-[#22222b]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
