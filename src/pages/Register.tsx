import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../axios";
import NavBar from "../components/NavBar";
import { redirect } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

const Register = () => {
  // prettier-ignore
  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const role = "Patient";

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setNotification("Passwords do not match");
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const response = await api.post("/register", {
        email: data.email,
        password: data.password,
        name: data.name,
        role: role,
        password_confirmation: data.confirmPassword,
      });

      if (response.status === 200) {
        setNotification("Registration successful!");
        redirect("/login");
      } else {
        setNotification("Registration failed. Please try again.");
      }
    } catch (error: unknown) {
      console.log(error);
      setNotification("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mt-10">Register</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password:</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {notification && (
            <p className="text-center mt-4 text-red-500">{notification}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
