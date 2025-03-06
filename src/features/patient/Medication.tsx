import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Medication = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/patient/medication") {
      // here we redirect to the first child route or index route
    }
  }, [location.pathname, navigate]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl">Medication</h2>
        </div>
      </div>
      <div className="flex space-x-6 items-center w-64 mt-2">
        <Link
          to="/patient/medication/diagnosis"
          className={`${
            location.pathname.includes("diagnosis")
              ? "text-[#454BE7] font-bold underline"
              : "text-[#454BE7] hover:underline"
          }`}
        >
          Diagnosis
        </Link>
        <Link
          to="/patient/medication/side-effects"
          className={`${
            location.pathname.includes("side-effects")
              ? "text-[#454BE7] font-bold underline"
              : "text-[#454BE7] hover:underline"
          } text-nowrap`}
        >
          Side effects
        </Link>
        <Link
          to="/patient/medication"
          className={`${
            location.pathname === "/patient/medication"
              ? "text-[#454BE7] font-bold underline"
              : "text-[#454BE7] hover:underline"
          }`}
        >
          Medications
        </Link>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Medication;
