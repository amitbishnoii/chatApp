import { useForm } from "react-hook-form";
import { SignUpService } from "../services/authService";

export interface SignUpForm {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    birthday: string;
}

const inputBase =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2";
const inputOk =
    "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/30";
const inputError = "border-red-500 focus:border-red-500 focus:ring-red-500/30";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1.5 text-xs text-red-600";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>();

    const handleForm = async (data: SignUpForm) => {
        const res = await SignUpService(data);
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Create your account
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    It only takes a minute.
                </p>

                <form
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label htmlFor="username" className={labelClass}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            aria-invalid={!!errors.username}
                            aria-describedby={
                                errors.username ? "username-error" : undefined
                            }
                            className={`${inputBase} ${
                                errors.username ? inputError : inputOk
                            }`}
                            {...register("username", {
                                required: "Username must be provided!",
                            })}
                        />
                        {errors.username && (
                            <p id="username-error" className={errorClass}>
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className={labelClass}>
                                First name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                aria-invalid={!!errors.firstName}
                                aria-describedby={
                                    errors.firstName
                                        ? "firstName-error"
                                        : undefined
                                }
                                className={`${inputBase} ${
                                    errors.firstName ? inputError : inputOk
                                }`}
                                {...register("firstName", {
                                    required: "Name is required!",
                                    minLength: {
                                        value: 2,
                                        message: "Please provide a valid name",
                                    },
                                })}
                            />
                            {errors.firstName && (
                                <p id="firstName-error" className={errorClass}>
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className={labelClass}>
                                Last name
                                <span className="ml-1 font-normal text-slate-400">
                                    (optional)
                                </span>
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                aria-invalid={!!errors.lastName}
                                aria-describedby={
                                    errors.lastName
                                        ? "lastName-error"
                                        : undefined
                                }
                                className={`${inputBase} ${
                                    errors.lastName ? inputError : inputOk
                                }`}
                                {...register("lastName")}
                            />
                            {errors.lastName && (
                                <p id="lastName-error" className={errorClass}>
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className={labelClass}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="At least 8 characters"
                            aria-invalid={!!errors.password}
                            aria-describedby={
                                errors.password ? "password-error" : undefined
                            }
                            className={`${inputBase} ${
                                errors.password ? inputError : inputOk
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
                            <p id="password-error" className={errorClass}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="birthday" className={labelClass}>
                            Birthday
                        </label>
                        <input
                            id="birthday"
                            type="date"
                            aria-invalid={!!errors.birthday}
                            aria-describedby={
                                errors.birthday ? "birthday-error" : undefined
                            }
                            className={`${inputBase} ${
                                errors.birthday ? inputError : inputOk
                            }`}
                            {...register("birthday", {
                                required: "Please provide your birthday.",
                            })}
                        />
                        {errors.birthday && (
                            <p id="birthday-error" className={errorClass}>
                                {errors.birthday.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating account…" : "Create account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
