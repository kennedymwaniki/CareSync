/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, Suspense } from "react";
import { getAllCareGivers } from "../../apis/CareGiverServive";
import {
  setPatientDoctor,
  removePatientDoctor,
} from "../../apis/PatientService";
import { CareProvider } from "../../types/types";
import Loader from "../../components/Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";
import { useProfile } from "../../hooks/UseProfile";

interface ActionMenuProps {
  providerId: number;
  onClose: () => void;
  patientId: number;
}

const ActionMenu = ({ providerId, onClose, patientId }: ActionMenuProps) => {
  const handleSetDoctor = async () => {
    try {
      const response = await setPatientDoctor(providerId, patientId);
      if (!response.error) {
        toast.success(response.message);
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

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="py-1 bg-white rounded-md" role="menu">
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
      </div>
    </div>
  );
};

const CareProvidersTable = () => {
  const [data, setData] = useState<CareProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { profile } = useProfile();

  const fetchCareGivers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllCareGivers();

      const transformedData: CareProvider[] = response.data.map(
        (caregiver) => ({
          profile: caregiver.profile.avatar || "👩‍⚕️",
          name: caregiver.name,
          id: caregiver.user_role.id,
          role: caregiver.role,
          specialty: caregiver.user_role.specialization || "General",
          active: caregiver.user_role.active === "1",
          lastActivity: caregiver.user_role.last_activity || "No activity",
          openTime: "9:00 AM",
          status:
            caregiver.user_role.active === "1" ? "Available" : "Unavailable",
        })
      );

      setData(transformedData);
      toast.success("Data loaded sucessfully");
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

  const handleFilterRole = (role: string | null) => {
    setFilterRole(role);
  };

  const handleFilterActive = (active: boolean | null) => {
    setFilterActive(active);
  };

  const filteredData = data.filter((provider) => {
    return (
      (!filterRole || provider.role === filterRole) &&
      (filterActive === null || provider.active === filterActive) &&
      provider.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const renderActionColumn = (provider: CareProvider) => {
    return (
      <td className="px-4 py-3 relative">
        <button
          className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
          onClick={() =>
            setActiveMenu(activeMenu === provider.id ? null : provider.id)
          }
        >
          <BsThreeDotsVertical />
        </button>
        {activeMenu === provider.id && profile?.patient?.id && (
          <ActionMenu
            providerId={provider.id}
            onClose={() => setActiveMenu(null)}
            patientId={profile.patient.id}
          />
        )}
      </td>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Care Providers</h1>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <button
            onClick={() => handleFilterRole("Doctor")}
            className={`px-3 py-1 text-sm rounded-md ${
              filterRole === "Doctor"
                ? "bg-[#454BE7] text-white"
                : "bg-gray-200"
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => handleFilterRole("Nurse")}
            className={`ml-2 px-3 py-1 text-sm rounded-md ${
              filterRole === "Nurse"
                ? "bg-[#454ae756] text-[#454BE7]"
                : "bg-gray-200"
            }`}
          >
            Nurse
          </button>
          <button
            onClick={() => handleFilterRole(null)}
            className="ml-2 px-3 py-1 text-sm rounded-md bg-gray-200"
          >
            Clear Role
          </button>
        </div>
        <div>
          <button
            onClick={() => handleFilterActive(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              filterActive === true ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterActive(false)}
            className={`ml-2 px-3 py-1 text-sm rounded-md ${
              filterActive === false ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Inactive
          </button>
          <button
            onClick={() => handleFilterActive(null)}
            className="ml-2 px-3 py-1 text-sm rounded-md bg-gray-200"
          >
            Clear Status
          </button>
        </div>
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={handleSearch}
          className="ml-auto px-4 py-2 border rounded-md"
        />
      </div>
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
                <td colSpan={8} className="text-center py-4">
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-red-500">
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
                <td colSpan={8} className="text-center py-4">
                  There is no data to display here!
                </td>
              </tr>
            )}
          </tbody>
        </Suspense>
      </table>
    </div>
  );
};

export default CareProvidersTable;
