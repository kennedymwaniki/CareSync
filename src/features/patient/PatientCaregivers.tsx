import { useState, useEffect, useCallback } from "react";
import {
  getPatientCareProviders,
  removePatientCareGiver,
} from "../../apis/PatientService";
import Loader from "../../components/Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";
import { useProfile } from "../../hooks/UseProfile";
import Nodata from "../../assets/medication baner.png";

// Define the types inside the component
interface UserRole {
  id: number;
  user_id: number;
  specialization: string | null;
  last_activity: string | null;
  license_number: string | null;
  license_issuing_body: string | null;
  clinic_name: string | null;
  clinic_address: string | null;
  active: string;
}

interface Profile {
  id: number;
  user_id: number;
  gender: string | null;
  date_of_birth: string | null;
  address: string | null;
  phone_number: string | null;
  avatar: string | null;
}

interface Caregiver {
  id: number;
  name: string;
  email: string;
  role: string;
  profile: Profile;
  user_role: UserRole;
}

// Action menu component
interface ActionMenuProps {
  caregiverId: number;
  patientId: number;
  onClose: () => void;
  onRemove: () => void;
}

const ActionMenu = ({
  caregiverId,
  patientId,
  onClose,
  onRemove,
}: ActionMenuProps) => {
  const handleRemoveCaregiver = async () => {
    try {
      const response = await removePatientCareGiver(caregiverId, patientId);
      if (!response.error) {
        toast.success("Caregiver removed successfully");
        onRemove(); // Call the onRemove callback to refresh the list
      }
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove caregiver"
      );
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="py-1 bg-white rounded-md" role="menu">
        <button
          onClick={handleRemoveCaregiver}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Remove as my caregiver
        </button>
      </div>
    </div>
  );
};

const PatientCaregivers = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { profile } = useProfile();
  const patientId = profile?.patient?.id;

  const fetchCaregivers = useCallback(async () => {
    if (!patientId) return;

    setLoading(true);
    try {
      const response = await getPatientCareProviders(patientId);
      if (response && response.data) {
        setCaregivers(response.data);
      } else {
        setCaregivers([]);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch caregivers"
      );
      toast.error("Failed to load caregivers");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchCaregivers();
  }, [patientId, fetchCaregivers]);

  const toggleMenu = (caregiverId: number) => {
    setActiveMenu(activeMenu === caregiverId ? null : caregiverId);
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-6">
            <Loader />
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-6 text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (!caregivers.length) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-6">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No caregivers assigned</p>
          </td>
        </tr>
      );
    }

    return caregivers.map((caregiver) => (
      <tr key={caregiver.id} className="hover:bg-gray-50 text-sm">
        <td className="px-4 py-3">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  caregiver.profile?.avatar || "https://via.placeholder.com/40"
                }
                alt={caregiver.name}
              />
            </div>
          </div>
        </td>
        <td className="px-4 py-3">{caregiver.name}</td>
        <td className="px-4 py-3">{caregiver.email}</td>
        <td className="px-4 py-3">
          {caregiver.user_role.specialization || "Not specified"}
        </td>
        <td className="px-4 py-3 relative">
          <div className="relative">
            <button
              onClick={() => toggleMenu(caregiver.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <BsThreeDotsVertical />
            </button>
            {activeMenu === caregiver.id && (
              <ActionMenu
                caregiverId={caregiver.id}
                patientId={patientId!}
                onClose={() => setActiveMenu(null)}
                onRemove={fetchCaregivers}
              />
            )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">My Caregivers</h1>
        <p className="text-gray-600 mt-1">Manage your assigned caregivers</p>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profile
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Specialization
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderTableBody()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientCaregivers;
