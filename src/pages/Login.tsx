import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../apis/authSlice";
import NavBar from "../components/NavBar";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setIsloading] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data: FormValues) => {
    const res = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    return res.json();
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    setIsloading(true);

    try {
      const response = await login(data);
      dispatch(loginUser({ user: response.user, token: response.token }));
      navigate("/dashboard");
    } catch (err) {
      console.error("Invalid email or password", err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-purple-900">
              User Log In
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Log in with your data that you entered during your registration
            </p>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 rounded-lg">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
