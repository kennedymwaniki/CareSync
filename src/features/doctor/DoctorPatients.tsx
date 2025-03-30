/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { getDoctorPatients } from "../../apis/DoctorService";
import api from "../../../axios";
import { toast } from "sonner";
import Loader from "../../components/Loader";
import Nodata from "../../assets/medication baner.png";
import { useNavigate } from "react-router-dom";

interface DoctorProfile {
  id: number;
  user_id: number;
  specialization: string | null;
  last_activity: string | null;
  license_number: string | null;
  license_issuing_body: string | null;
  clinic_name: string | null;
  clinic_address: string | null;
  active: string;
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
  data: Patient[];
  error?: boolean;
  message?: string;
}

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [_doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(
    null
  );

  useEffect(() => {
    fetchDoctorProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch doctor profile first to get the doctor's ID
  const fetchDoctorProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get("/user/doctor");
      console.log("Doctor Profile Response:", response.data.data);
      if (!response.data.error) {
        setDoctorProfile(response.data.data);
        console.log("Doctor Profile:", response.data.data); // Changed from response.data.profile
        if (response.data.data) {
          fetchPatients(response.data.data.id); // Use response data directly
        }
      } else {
        setError("Failed to fetch doctor profile");
        toast.error("Could not load doctor profile");
      }
    } catch (error) {
      setError("An error occurred while fetching doctor profile");
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Fetch patients using the doctor's ID
  const fetchPatients = async (doctorId: number): Promise<void> => {
    try {
      const response: ApiResponse = await getDoctorPatients(doctorId);

      if (!response || !response.data || response.data.length === 0) {
        setPatients([]);
      } else {
        setPatients(response.data);
        toast.success("Patients loaded successfully");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch patients"
      );
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

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-6">
            <Loader />
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-6 text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (!filteredPatients.length) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-6">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No patients assigned</p>
          </td>
        </tr>
      );
    }

    return filteredPatients.map((patientData) => {
      const patient = patientData.patient;
      return (
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
      );
    });
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="font-bold text-3xl">My Patients</h1>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Search patient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto px-4 py-2 border rounded-md"
        />
      </div>
      <table className="min-w-full mx-auto mt-4">
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
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default DoctorPatients;
