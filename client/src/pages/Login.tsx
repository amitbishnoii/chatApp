import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginService } from "../services/authService";
import useAuth from "../hooks/useAuth";

interface LoginForm {
    username: string;
    password: string;
}

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>();

    const [error, setError] = useState<string>();
    const { login } = useAuth();

    const handleForm = async (data: LoginForm) => {
        setError(undefined);

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
        <main className="relative min-h-screen overflow-hidden bg-[#050807] px-5 py-10 text-white">
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
                <section className="w-full">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-[#06100b] shadow-lg shadow-emerald-500/20">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-7 w-7"
                                aria-hidden="true"
                            >
                                <path
                                    d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v6a3.5 3.5 0 0 1-3.5 3.5H12l-4.5 4v-4.2A3.5 3.5 0 0 1 5 12.5v-6Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 9h.01M12 9h.01M15 9h.01"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-white">
                                Chat<span className="text-emerald-400">AI</span>
                            </h2>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                        <div className="mb-8">
                            <p className="mb-3 text-sm font-medium text-emerald-400">
                                Welcome back
                            </p>

                            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                Sign in to your account
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-[#849089]">
                                Continue your conversations with your AI
                                assistant.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleForm)}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium text-[#d7e0da]"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                    className={`h-13 w-full rounded-xl border bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#59645d] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 ${
                                        errors.username
                                            ? "border-red-500"
                                            : "border-white/10"
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
                                        className="block text-sm font-medium text-[#d7e0da]"
                                    >
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters.",
                                        },
                                    })}
                                    className={`h-13 w-full rounded-xl border bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#59645d] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-white/10"
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
                                disabled={isSubmitting}
                                className="h-13 w-full rounded-xl bg-emerald-400 px-4 text-sm font-bold text-[#06100b] shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-[#657068]">
                        Secure, private, and powered by AI
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Login;
