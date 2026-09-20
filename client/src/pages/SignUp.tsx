import { useForm } from "react-hook-form";
import { SignUpService } from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export interface SignUpForm {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    birthday: string;
}

const fontHeading = "font-['Bricolage_Grotesque',sans-serif]";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const { login } = useAuth();

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

    return (
        <div className="min-h-screen bg-[#0b0b0c] px-5 py-10 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
                <div className="w-full">
                    <div className="mb-10">
                        <h1
                            className={`text-4xl font-bold tracking-tight text-[#f5f5f4] sm:text-5xl ${fontHeading}`}
                        >
                            Create your account
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#777783]">
                            Set up your account and get started in just a
                            minute.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-[#262626] bg-[#131314] p-6 sm:p-8">
                        <form
                            onSubmit={handleSubmit(handleForm)}
                            noValidate
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    aria-invalid={!!errors.username}
                                    aria-describedby={
                                        errors.username
                                            ? "username-error"
                                            : undefined
                                    }
                                    className={`h-13 w-full rounded-xl border bg-[#1b1b1c] px-4 text-sm text-[#f5f5f4] outline-none transition placeholder:text-[#6b6b6b] focus:bg-[#1e1e1f] focus:ring-4 ${
                                        errors.username
                                            ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
                                            : "border-[#2a2a2b] focus:border-[#ff6a1a] focus:ring-[#ff6a1a]/10"
                                    }`}
                                    {...register("username", {
                                        required: "Username must be provided!",
                                    })}
                                />

                                {errors.username && (
                                    <p
                                        id="username-error"
                                        className="mt-2 text-xs font-medium text-red-400"
                                    >
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                                    >
                                        First name
                                    </label>

                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="First name"
                                        aria-invalid={!!errors.firstName}
                                        aria-describedby={
                                            errors.firstName
                                                ? "firstName-error"
                                                : undefined
                                        }
                                        className={`h-13 w-full rounded-xl border bg-[#1b1b1c] px-4 text-sm text-[#f5f5f4] outline-none transition placeholder:text-[#6b6b6b] focus:bg-[#1e1e1f] focus:ring-4 ${
                                            errors.firstName
                                                ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
                                                : "border-[#2a2a2b] focus:border-[#ff6a1a] focus:ring-[#ff6a1a]/10"
                                        }`}
                                        {...register("firstName", {
                                            required: "Name is required!",
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Please provide a valid name",
                                            },
                                        })}
                                    />

                                    {errors.firstName && (
                                        <p
                                            id="firstName-error"
                                            className="mt-2 text-xs font-medium text-red-400"
                                        >
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                                    >
                                        Last name
                                        <span className="ml-1 font-normal text-[#75757a]">
                                            (optional)
                                        </span>
                                    </label>

                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        aria-invalid={!!errors.lastName}
                                        aria-describedby={
                                            errors.lastName
                                                ? "lastName-error"
                                                : undefined
                                        }
                                        className={`h-13 w-full rounded-xl border bg-[#1b1b1c] px-4 text-sm text-[#f5f5f4] outline-none transition placeholder:text-[#6b6b6b] focus:bg-[#1e1e1f] focus:ring-4 ${
                                            errors.lastName
                                                ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
                                                : "border-[#2a2a2b] focus:border-[#ff6a1a] focus:ring-[#ff6a1a]/10"
                                        }`}
                                        {...register("lastName")}
                                    />

                                    {errors.lastName && (
                                        <p
                                            id="lastName-error"
                                            className="mt-2 text-xs font-medium text-red-400"
                                        >
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="At least 8 characters"
                                    aria-invalid={!!errors.password}
                                    aria-describedby={
                                        errors.password
                                            ? "password-error"
                                            : undefined
                                    }
                                    className={`h-13 w-full rounded-xl border bg-[#1b1b1c] px-4 text-sm text-[#f5f5f4] outline-none transition placeholder:text-[#6b6b6b] focus:bg-[#1e1e1f] focus:ring-4 ${
                                        errors.password
                                            ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
                                            : "border-[#2a2a2b] focus:border-[#ff6a1a] focus:ring-[#ff6a1a]/10"
                                    }`}
                                    {...register("password", {
                                        required: "Password is required.",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters.",
                                        },
                                    })}
                                />

                                {errors.password && (
                                    <p
                                        id="password-error"
                                        className="mt-2 text-xs font-medium text-red-400"
                                    >
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="birthday"
                                    className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                                >
                                    Birthday
                                </label>

                                <input
                                    id="birthday"
                                    type="date"
                                    aria-invalid={!!errors.birthday}
                                    aria-describedby={
                                        errors.birthday
                                            ? "birthday-error"
                                            : undefined
                                    }
                                    className={`h-13 w-full rounded-xl border bg-[#1b1b1c] px-4 text-sm text-[#f5f5f4] outline-none transition scheme-dark focus:bg-[#1e1e1f] focus:ring-4 ${
                                        errors.birthday
                                            ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/10"
                                            : "border-[#2a2a2b] focus:border-[#ff6a1a] focus:ring-[#ff6a1a]/10"
                                    }`}
                                    {...register("birthday", {
                                        required:
                                            "Please provide your birthday.",
                                    })}
                                />

                                {errors.birthday && (
                                    <p
                                        id="birthday-error"
                                        className="mt-2 text-xs font-medium text-red-400"
                                    >
                                        {errors.birthday.message}
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
                                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#ff6a1a] px-4 text-sm font-semibold text-[#0b0b0c] transition hover:bg-[#ff8140] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6a1a]/20 disabled:cursor-not-allowed disabled:opacity-60"
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
                    <div className="mt-8 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#22222b]" />

                        <span className="text-xs text-[#555560]">
                            Create your account
                        </span>

                        <div className="h-px flex-1 bg-[#22222b]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
