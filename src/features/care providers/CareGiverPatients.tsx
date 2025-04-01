/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import api from "../../../axios";
import { toast } from "sonner";
import Loader from "../../components/Loader";
import Nodata from "../../assets/medication baner.png";
import { useNavigate } from "react-router-dom";

interface CaregiverProfile {
  id: number;
  user_id: number;
  specialization: string | null;
  last_activity: string | null;
  agency_name: string | null;
  agency_contact: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    profile: {
      id: number;
      user_id: number;
      gender: string | null;
      date_of_birth: string | null;
      address: string | null;
      phone_number: string | null;
      avatar: string | null;
    };
  };
}

interface Patient {
  patient: {
    id: number;
    user_id: number;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      email_verified_at: string | null;
    };
  };
}

interface ApiResponse {
  error: boolean;
  data: {
    id: number;
    user_id: number;
    specialization: string | null;
    last_activity: string | null;
    agency_name: string | null;
    agency_contact: string | null;
    user: CaregiverProfile["user"];
  };
  message?: string;
}

const CareGiverPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [_caregiverProfile, setCaregiverProfile] =
    useState<CaregiverProfile | null>(null);

  useEffect(() => {
    fetchCaregiverProfile();
  }, []);

  const fetchCaregiverProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get<ApiResponse>("/user/caregiver");

      if (!response.data.error && response.data.data) {
        setCaregiverProfile(response.data.data);
        await fetchPatients(response.data.data.id);
      } else {
        throw new Error("Failed to fetch caregiver profile");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Could not load caregiver profile");
    }
  };

  const fetchPatients = async (caregiverId: number) => {
    try {
      const response = await api.post(
        "/care-providers/fetch-caregiver-patient",
        {
          caregiver_id: caregiverId,
        }
      );

      if (response.data && response.data.data) {
        setPatients(response.data.data);
        toast.success("Patients loaded successfully");
      } else {
        setPatients([]);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch patients";
      setError(errorMessage);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const handleViewPatient = (patientId: number) => {
    navigate(`${patientId}`);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.patient.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTableRows = () => {
    if (loading)
      return (
        <tr>
          <td colSpan={7} className="text-center py-6">
            <Loader />
          </td>
        </tr>
      );

    if (error)
      return (
        <tr>
          <td colSpan={7} className="text-center py-6 text-red-500">
            {error}
          </td>
        </tr>
      );

    if (!filteredPatients.length)
      return (
        <tr>
          <td colSpan={7} className="text-center py-6">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No patients assigned</p>
          </td>
        </tr>
      );

    return filteredPatients.map(({ patient }) => (
      <tr key={patient.id} className="hover:bg-gray-50 text-sm text-nowrap">
        <td className="px-4 py-2">
          <img
            src="https://via.placeholder.com/40"
            alt={patient.user.name}
            className="w-8 h-8 rounded-full"
          />
        </td>
        <td className="px-4 py-2">{patient.user.name}</td>
        <td className="px-4 py-2">{patient.user.email}</td>
        <td className="px-4 py-2">-</td>
        <td className="px-4 py-2">-</td>
        <td className="px-4 py-2">-</td>
        <td className="px-4 py-2">
          <button
            onClick={() => handleViewPatient(patient.id)}
            className="text-blue-500 hover:underline"
          >
            View
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="font-bold text-3xl">My Patients</h1>
      </div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search patient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-sm text-nowrap border-b-2">
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Current Diagnosis</th>
              <th className="px-4 py-2">Adherence Percentage</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CareGiverPatients;
