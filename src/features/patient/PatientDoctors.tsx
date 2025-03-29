import { useState, useEffect, useCallback } from "react";
import {
  getPatientDoctors,
  removePatientDoctor,
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

interface Doctor {
  id: number;
  name: string;
  email: string;
  role: string;
  profile: Profile;
  user_role: UserRole;
}

// interface ApiResponse {
//   data: Doctor[];
//   current_page: number;
//   last_page: number;
//   per_page: number;
//   total: number;
// }

// Action menu component
interface ActionMenuProps {
  doctorId: number;
  patientId: number;
  onClose: () => void;
  onRemove: () => void;
}

const ActionMenu = ({
  doctorId,
  patientId,
  onClose,
  onRemove,
}: ActionMenuProps) => {
  const handleRemoveDoctor = async () => {
    try {
      const response = await removePatientDoctor(doctorId, patientId);
      if (!response.error) {
        toast.success("Doctor removed successfully");
        onRemove(); // Call the onRemove callback to refresh the list
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

const PatientDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { profile } = useProfile();
  const patientId = profile?.patient?.id;

  const fetchDoctors = useCallback(async () => {
    if (!patientId) return;

    setLoading(true);
    try {
      const response = await getPatientDoctors(patientId);
      if (response && response.data) {
        setDoctors(response.data);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch doctors"
      );
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchDoctors();
  }, [patientId, fetchDoctors]);

  const toggleMenu = (doctorId: number) => {
    setActiveMenu(activeMenu === doctorId ? null : doctorId);
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

    if (!doctors.length) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-6">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No doctors assigned</p>
          </td>
        </tr>
      );
    }

    return doctors.map((doctor) => (
      <tr key={doctor.id} className="hover:bg-gray-50 text-sm">
        <td className="px-4 py-3">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={doctor.profile.avatar || "https://via.placeholder.com/40"}
                alt={doctor.name}
              />
            </div>
          </div>
        </td>
        <td className="px-4 py-3">{doctor.name}</td>
        <td className="px-4 py-3">{doctor.email}</td>
        <td className="px-4 py-3">
          {doctor.user_role.specialization || "Not specified"}
        </td>
        <td className="px-4 py-3 relative">
          <div className="relative">
            <button
              onClick={() => toggleMenu(doctor.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <BsThreeDotsVertical />
            </button>
            {activeMenu === doctor.id && (
              <ActionMenu
                doctorId={doctor.user_role?.id}
                patientId={patientId!}
                onClose={() => setActiveMenu(null)}
                onRemove={fetchDoctors}
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
        <h1 className="text-xl font-semibold">My Doctors</h1>
        <p className="text-gray-600 mt-1">
          Manage your assigned medical doctors
        </p>
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

export default PatientDoctors;
