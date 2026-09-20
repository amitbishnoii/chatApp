import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginService } from "../services/authService";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { usePasswordToggle } from "../hooks/useTogglePassword";

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
    const showPassword = usePasswordToggle();

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

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center justify-center">
                <section className="w-full">
                    <div className="mb-8 flex items-center gap-3">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-white">
                                Chat
                                <span className="text-emerald-400">.AI</span>
                            </h2>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/8 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                        <div className="mb-8">
                            <p className="mb-3 text-sm font-medium text-emerald-400">
                                Welcome back
                            </p>

                            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                Sign in to your account
                            </h1>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleForm)}
                            className="space-y-5"
                        >
                            <FormInput
                                label="Username"
                                id="username"
                                placeholder="Enter your username"
                                type="text"
                                styles={`h-13 w-full rounded-xl border bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#59645d] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 ${
                                    errors.username
                                        ? "border-red-500"
                                        : "border-white/10"
                                }`}
                                error={errors.username}
                                registerProps={register("username", {
                                    required: "Username is required",
                                })}
                            />

                            <FormInput
                                label="Password"
                                id="password"
                                type={showPassword.show ? "text" : "password"}
                                placeholder="Enter your password"
                                registerProps={register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters.",
                                    },
                                })}
                                styles={`h-13 w-full rounded-xl border bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#59645d] focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-white/10"
                                }`}
                                error={errors.password}
                                showPassword={showPassword.show}
                                togglePassword={showPassword.toggle}
                            />

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

                    <div className="mt-3 text-center text-sm text-[#849089]">
                        New to ChatAI?
                        <Link
                            to="/signup"
                            className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                        >
                            Create an account
                        </Link>
                    </div>

                    <p className="mt-4 text-center text-xs text-[#657068]">
                        Secure, private, and powered by AI
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Login;
