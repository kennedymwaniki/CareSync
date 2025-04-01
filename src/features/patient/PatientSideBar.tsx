import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FiBell, FiChevronDown, FiAlertTriangle } from "react-icons/fi";
import logo from "../../assets/carepulse logo_2.png";
import { logoutUser } from "../../apis/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useProfile } from "../../hooks/UseProfile";
import { getTodaysMedication } from "../../apis/PatientService";

interface SidebarProps {
  navigation: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
  }[];
}

const PatientSideBar = ({ navigation }: SidebarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [medicationCount, setMedicationCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { profile } = useProfile();
  const patient_id = profile?.patient?.id;

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMedicationCount = async () => {
      if (!patient_id) return;
      setLoading(true);

      try {
        const result = await getTodaysMedication(patient_id);
        if (!result.error && result.schedules?.medications) {
          setMedicationCount(result.schedules.medications.length);
        }
      } catch (error) {
        console.error("Error fetching medication count:", error);
        setError("Failed to fetch medication count");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicationCount();
  }, [patient_id]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  // Extract username from email (everything before @)
  const getEmailUsername = (email: string) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  // Render appropriate user profile section based on loading/error state
  const renderUserProfileSection = () => {
    if (loading) {
      return (
        <div className="flex items-center border border-black p-4 rounded-md bg-gray-50">
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="ml-3 flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="ml-auto w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center border border-red-300 p-4 rounded-md bg-red-50">
          <FiAlertTriangle className="h-10 w-10 text-red-500" />
          <div className="ml-3">
            <p className="text-xs font-medium text-red-700">
              Error loading profile
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center relative border border-black p-4 rounded-md">
        <img
          src={profile?.profile?.avatar || "https://via.placeholder.com/40"}
          alt="User"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="text-xs font-medium text-black">
            {profile?.name || "Patient"}
          </p>
          <p className="text-xs text-gray-400">
            {profile?.email ? getEmailUsername(profile.email) : ""}
          </p>
        </div>
        <button
          ref={buttonRef}
          className="ml-auto text-gray-500 hover:text-black"
          onClick={toggleDropdown}
        >
          <FiChevronDown className="h-5 w-5" />
        </button>

        {dropdownOpen && !loading && !error && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-6 -mr-20 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10"
          >
            <NavLink
              to="patient-profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </NavLink>
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-[240px] bg-white shadow-xl min-h-screen flex flex-col border-r">
      <div>
        <div className="flex items-center justify-center py-3">
          <NavLink to="/" className="text-black font-bold text-xl b">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-[#454ae756] text-[#454BE7]"
                      : "text-black hover:bg-[#454ae756] hover:text-[#454BE7]"
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-32 px-2 space-y-1">
          <NavLink
            to="patient-notifications"
            className={({ isActive }) =>
              `group flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-[#454ae756] text-[#454BE7]"
                  : "text-black hover:bg-[#454ae756] hover:text-[#454BE7]"
              }`
            }
          >
            <FiBell className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="flex-1">Notifications</span>
            <span className="mx-auto text-xs bg-blue-600 text-white rounded-full px-2 py-0.5 ">
              {medicationCount}
            </span>
          </NavLink>
        </div>
      </div>

      <div className="px-4 py-3 border-gray-700 mt-4">
        {renderUserProfileSection()}
      </div>
    </aside>
  );
};

export default PatientSideBar;
