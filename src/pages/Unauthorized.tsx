// client/src/Pages/Unauthorized.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the homepage after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-semibold text-red-500">
        You are not authorized to view this page
        <span>❌</span>
      </h1>
      <p className="mb-4 text-lg text-gray-600">
        Oops! Looks like you're lost.
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600">
        Let's get you back <p className="text-blue-500">home</p>.
      </p>
    </div>
  );
};

export default Unauthorized;
