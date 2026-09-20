import { Eye, EyeOff } from "lucide-react";
import type { FieldError } from "react-hook-form";

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    optional?: boolean;
    error?: FieldError;
    registerProps: ReturnType<any>;
    showPassword?: boolean;
    togglePassword?: () => void;
    styles: string;
}

const FormInput = ({
    id,
    label,
    type = "text",
    placeholder,
    optional,
    error,
    registerProps,
    showPassword,
    togglePassword,
    styles,
}: FormInputProps) => {
    return (
        <>
            {label === "Password" || label === "Confirm Password" ? (
                <div>
                    <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                    >
                        {label}
                        {optional && (
                            <span className="ml-1 font-normal text-[#75757a]">
                                (optional)
                            </span>
                        )}
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={placeholder}
                            className={styles}
                            {...registerProps}
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition-colors hover:text-zinc-300"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-[#d4d4d2]"
                    >
                        {label}
                        {optional && (
                            <span className="ml-1 font-normal text-[#75757a]">
                                (optional)
                            </span>
                        )}
                    </label>
                    <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={styles}
                        {...registerProps}
                    />
                    {error && (
                        <p
                            id={`${id}-error`}
                            className="mt-2 text-xs font-medium text-red-400"
                        >
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default FormInput;
