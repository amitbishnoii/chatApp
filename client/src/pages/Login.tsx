import { useForm } from "react-hook-form";
import { LoginService } from "../services/authService";

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

    const handleForm = async (data: LoginForm) => {
        const loginRes = await LoginService(data);
        console.log(loginRes.message);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleForm)}>
                <input
                    type="text"
                    placeholder="username"
                    {...register("username", {
                        required: "username is required",
                    })}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                    type="text"
                    placeholder="password"
                    {...register("password", {
                        required: "Password is Required",
                        minLength: {
                            value: 8,
                            message: "Password must be atleast 8 characters.",
                        },
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;
