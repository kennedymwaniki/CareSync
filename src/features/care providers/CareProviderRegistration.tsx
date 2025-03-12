import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../../axios";
import { useNavigate, Link } from "react-router-dom";
import { Heart, Pill, Eye, EyeOff } from "lucide-react";
import care from "../../assets/doctors.jpeg";

type FormValues = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const role = "CareGiver";

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
        navigate("/login");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:flex-col md:w-1/2 bg-[#454BE7] relative">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${care})` }}
          ></div>
        </div>

        {/* Logo */}
        <div className="absolute top-6 left-6 flex items-center z-10">
          <div className="text-white flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Heart className="text-white absolute" size={24} />
              <Pill className="text-white absolute" size={24} />
            </div>
            <span className="text-xl font-bold">CarePulse</span>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 right-8 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">
            Your Health, Your Schedule
          </h2>
          <p className="text-lg">
            CarePulse helps you manage medications and appointments with timely
            reminders, ensuring you never miss important health routines.
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="lg:hidden flex items-center justify-center mb-10">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Heart className="text-[#454BE7] absolute" size={24} />
              <Pill className="text-[#454BE7] absolute" size={24} />
            </div>
            <span className="text-xl font-bold text-[#454BE7]">CarePulse</span>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create account
          </h1>
          <p className="text-gray-600 mb-8">
            Join CarePulse to manage your medications
          </p>

          {notification && (
            <div className="text-red-500 mb-4">{notification}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7]"
                />
              </div>
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7]"
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7] pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7] pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#454BE7] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#454BE7]"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#454BE7] hover:text-indigo-500 font-medium"
              >
                Sign in
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              <Link
                to="/"
                className="text-[#454BE7] hover:text-indigo-500 font-medium"
              >
                Go back home
              </Link>
            </p>
          </div>

          <div className="mt-16 text-center text-gray-400 text-sm">
            © 2025 CarePulse. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
