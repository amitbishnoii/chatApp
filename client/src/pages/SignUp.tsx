import { useForm } from "react-hook-form";
import { SignUpService } from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { usePasswordToggle } from "../hooks/useTogglePassword";

export interface SignUpForm {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    birthday: string;
}

const fontHeading = "font-['Bricolage_Grotesque',sans-serif]";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const { login } = useAuth();
    const showPassword = usePasswordToggle();

    const handleForm = async (data: SignUpForm) => {
        const res = await SignUpService(data);
        if (!res.success) {
            setError(res.message);
            return;
        }
        login({
            role: res.userInfo.role,
            accessToken: res.token,
            id: res.userInfo._id,
            username: res.userInfo.username,
        });
        navigate("/setup");
    };

    const inputClass = `h-13 w-full rounded-xl border bg-[#11192b] px-4 text-sm text-[#f5f7ff] outline-none transition placeholder:text-[#68738f] focus:bg-[#151f35] focus:ring-4 ${
        error
            ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
            : "border-[#273452] focus:border-violet-400 focus:ring-violet-400/15"
    }`;

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a14] px-5 py-10 text-white">
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
                <div className="w-full">
                    <div className="mb-10">
                        <h2
                            className={`mb-6 text-4xl font-bold tracking-tight text-white ${fontHeading}`}
                        >
                            Chat<span className="text-violet-400">.AI</span>
                        </h2>
                        <h1
                            className={`text-5xl font-bold tracking-tight text-[#f5f7ff] sm:text-6xl ${fontHeading}`}
                        >
                            Create your account
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-[#8b93aa]">
                            Set up your account and start having intelligent
                            conversations.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-white/9 bg-white/4.5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
                        <form
                            onSubmit={handleSubmit(handleForm)}
                            noValidate
                            className="space-y-6"
                        >
                            <FormInput
                                label="Username"
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                error={errors.username}
                                styles={`h-13 w-full rounded-xl border bg-[#11192b] px-4 text-sm text-[#f5f7ff] outline-none transition placeholder:text-[#68738f] focus:bg-[#151f35] focus:ring-4 ${
                                    error
                                        ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
                                        : "border-[#273452] focus:border-violet-400 focus:ring-violet-400/15"
                                }`}
                                registerProps={register("username", {
                                    required: "Username must be provided!",
                                })}
                            />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <FormInput
                                    label="First Name"
                                    id="firstName"
                                    type="text"
                                    placeholder="First name"
                                    error={errors.firstName}
                                    styles={inputClass}
                                    registerProps={register("firstName", {
                                        required: "Name is required!",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Please provide a valid name",
                                        },
                                    })}
                                />
                                <FormInput
                                    label="Last Name"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    optional={true}
                                    error={errors.lastName}
                                    styles={inputClass}
                                    registerProps={register("lastName")}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <FormInput
                                    label="Password"
                                    id="password"
                                    type={
                                        showPassword.show ? "text" : "password"
                                    }
                                    placeholder="At least 8 characters"
                                    error={errors.password}
                                    styles={inputClass}
                                    showPassword={showPassword.show}
                                    togglePassword={showPassword.toggle}
                                    registerProps={register("password", {
                                        required: "Password is required.",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters.",
                                        },
                                    })}
                                />
                                <FormInput
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    type={
                                        showPassword.show ? "text" : "password"
                                    }
                                    placeholder="Re-enter your password"
                                    error={errors.confirmPassword}
                                    styles={inputClass}
                                    showPassword={showPassword.show}
                                    togglePassword={showPassword.toggle}
                                    registerProps={register("confirmPassword", {
                                        required:
                                            "Please confirm your password.",
                                        validate: (value) =>
                                            value === watch("password") ||
                                            "Passwords do not Match",
                                    })}
                                />
                            </div>
                            <div>
                                <FormInput
                                    label="Birthday"
                                    id="birthday"
                                    type="date"
                                    error={errors.birthday}
                                    styles={inputClass}
                                    registerProps={register("birthday", {
                                        required:
                                            "Please provide your birthday.",
                                    })}
                                />
                            </div>
                            {error && (
                                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/25 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting && (
                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-90"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                )}

                                <span>
                                    {isSubmitting
                                        ? "Creating account…"
                                        : "Create account"}
                                </span>
                            </button>
                        </form>
                    </div>

                    <div className="mt-6 text-center text-sm text-[#8b93aa]">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-violet-400 transition hover:text-violet-300"
                        >
                            Sign in
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-[#68738f]">
                            Secure and powered by AI
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
