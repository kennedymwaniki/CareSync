/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, Suspense } from "react";
import { getAllCareGivers } from "../../apis/CareGiverServive";
import {
  setPatientDoctor,
  removePatientDoctor,
  setPatientCareGiver,
  removePatientCareGiver,
} from "../../apis/PatientService";
import { CareProvider } from "../../types/types";
import Loader from "../../components/Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";
import { useProfile } from "../../hooks/UseProfile";
import PatientDoctors from "./PatientDoctors";
import PatientCaregivers from "./PatientCaregivers";

// Component remains the same
interface ActionMenuProps {
  providerId: number;
  onClose: () => void;
  patientId: number;
  providerRole: string;
}

// prettier-ignore
const ActionMenu = ({providerId,onClose,patientId,providerRole,}: ActionMenuProps) => {
  // Doctor-specific actions
  const handleSetDoctor = async () => {
    try {
      const response = await setPatientDoctor(providerId, patientId);
      if (!response.error) {
        toast.success(response.message || "Doctor assigned successfully");
      }
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to set doctor"
      );
    }
  };

  const handleRemoveDoctor = async () => {
    try {
      const response = await removePatientDoctor(providerId, patientId);
      if (!response.error) {
        toast.success("Doctor removed successfully");
      }
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove doctor"
      );
    }
  };

  // Caregiver-specific actions
  const handleSetCaregiver = async () => {
    try {
      const response = await setPatientCareGiver(
        providerId,
        patientId,
      );
      if (!response.error) {
        toast.success(response.message || "Caregiver assigned successfully");
      }
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to set caregiver"
      );
    }
  };

  const handleRemoveCaregiver = async () => {
    try {
      const response = await removePatientCareGiver(providerId, patientId);
      if (!response.error) {
        toast.success("Caregiver removed successfully");
      }
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove caregiver"
      );
    }
  };

  return (
    <div 
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
      onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling to parent
    >
      <div className="py-1 bg-white rounded-md" role="menu">
        {providerRole === "Doctor" ? (
          <>
            <button
              onClick={handleSetDoctor}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Set as my doctor
            </button>
            <button
              onClick={handleRemoveDoctor}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Remove as my doctor
            </button>
          </>
        ) : providerRole === "Caregiver" ? (
          <>
            <button
              onClick={handleSetCaregiver}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Set as my caregiver
            </button>
            <button
              onClick={handleRemoveCaregiver}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Remove as my caregiver
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

// Main component with navigation
const CareProvidersTable = () => {
  const [data, setData] = useState<CareProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { profile } = useProfile();
  // Add state to track which view is active
  const [activeView, setActiveView] = useState<
    "all" | "doctors" | "caregivers"
  >("all");

  const fetchCareGivers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllCareGivers();

      const transformedData: CareProvider[] = response.data.map(
        (caregiver) => ({
          profile: caregiver?.profile?.avatar || "👩‍⚕️",
          name: caregiver.name,
          id: caregiver.user_role?.id,
          role: caregiver.role,
          specialty: caregiver.user_role?.specialization || "General",
          active: caregiver.user_role.active === "1",
          lastActivity: caregiver.user_role.last_activity || "No activity",
          openTime: "9:00 AM",
          status:
            caregiver.user_role.active === "1" ? "Available" : "Unavailable",
        })
      );

      setData(transformedData);
      toast.success("Data loaded successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch care providers"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCareGivers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((provider) => {
    return provider.name.toLowerCase().includes(search.toLowerCase());
  });

  const renderActionColumn = (provider: CareProvider) => {
    return (
      <td className="px-4 py-3 relative">
        <button
          className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
          onClick={(e) => {
            e.stopPropagation(); // Stop event from bubbling up
            // Check for null, undefined, or type mismatches
            const isActive = activeMenu === provider.id;
            setActiveMenu(isActive ? null : provider.id);
          }}
        >
          <BsThreeDotsVertical />
        </button>
        {activeMenu === provider.id && profile?.patient?.id && (
          <ActionMenu
            providerId={provider.id}
            onClose={() => setActiveMenu(null)}
            patientId={profile.patient.id}
            providerRole={provider.role}
          />
        )}
      </td>
    );
  };

  // Render the main navigation
  const renderNavigation = () => {
    return (
      <div className="flex mb-6">
        {/* Left side navigation links */}
        <div className="inline-flex gap-4 items-center justify-between mr-auto">
          <button
            onClick={() => setActiveView("all")}
            className={`font-medium ${
              activeView === "all"
                ? "text-[#454BE7] border-b-2 border-[#454BE7]"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            All Care Providers
          </button>
          <button
            onClick={() => setActiveView("doctors")}
            className={`font-medium ${
              activeView === "doctors"
                ? "text-[#454BE7] border-b-2 border-[#454BE7]"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            My Doctors
          </button>
          <button
            onClick={() => setActiveView("caregivers")}
            className={`font-medium ${
              activeView === "caregivers"
                ? "text-[#454BE7] border-b-2 border-[#454BE7]"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            My Care Givers
          </button>
        </div>

        {/* Search input - only show for All Care Providers view */}
        {activeView === "all" && (
          <div>
            <input
              type="text"
              placeholder="Search name..."
              value={search}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-md"
            />
          </div>
        )}
      </div>
    );
  };

  // Render the all care providers table
  const renderAllCareProvidersTable = () => {
    return (
      <table className="min-w-full">
        <thead>
          <tr className="text-sm text-nowrap border-b-2">
            <th className="px-4 py-2">Provider id</th>
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Specialty</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Last Activity</th>
            <th className="px-4 py-2">Open Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <Suspense fallback={<Loader />}>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={10} className="text-center py-4 text-red-500">
                  Error: {error}
                  <button
                    onClick={fetchCareGivers}
                    className="ml-4 px-4 py-2 bg-[#454BE7] text-white rounded-md"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((provider, index) => (
                <tr
                  key={index}
                  className={`text-sm hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => setActiveMenu(null)} // Close menu when clicking row
                >
                  <td className="px-4 py-2">{provider.id}</td>
                  <td className="px-4 py-2">
                    <img
                      src={provider.profile}
                      alt={provider.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{provider.name}</td>
                  <td className="px-4 py-2">{provider.role}</td>
                  <td className="px-4 py-2">{provider.specialty}</td>
                  <td className="px-4 py-2">
                    {provider.active ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{provider.lastActivity}</td>
                  <td className="px-4 py-2">{provider.openTime}</td>
                  <td className="px-4 py-2">{provider.status}</td>
                  {renderActionColumn(provider)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  There is no data to display here!
                </td>
              </tr>
            )}
          </tbody>
        </Suspense>
      </table>
    );
  };

  // Render the appropriate content based on the active view
  const renderContent = () => {
    switch (activeView) {
      case "doctors":
        return <PatientDoctors />;
      case "caregivers":
        return <PatientCaregivers />;
      case "all":
      default:
        return renderAllCareProvidersTable();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Care Providers</h1>
      {renderNavigation()}
      {renderContent()}
    </div>
  );
};

export default CareProvidersTable;
