import { useState, useEffect } from "react";
import StatCards from "../../components/StatCards";
import DoctorBanner from "./DoctoBanner";
import DoctorRightSideBar from "./DoctorRightSideBar";
import MissedMedicationChart from "./MissedMedicationChart";
import LatestSideEffectsTable from "./LastSideEffectsTable";
import {
  getDoctorPatients,
  getMissedPatientsMedication,
  getLatestSideEffects,
} from "../../apis/DoctorService";
import api from "../../../axios";
import { toast } from "sonner";

export interface DoctorProfile {
  id: number;
}

interface Patient {
  patient: {
    id: number;
  };
}

interface MissedMedication {
  patient_id: number;
  patient_name: string;
  counts: number;
}

interface SideEffect {
  id: number;
  medication_id: number;
  patient_id: number;
  datetime: string;
  side_effect: string;
  severity: string;
  duration: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
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
  medication: {
    id: number;
    patient_id: number;
    medication_name: string;
    // other properties...
  };
}

export interface SideEffectResponse {
  data: SideEffect[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const DoctorSummary = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [missedMedications, setMissedMedications] = useState<
    MissedMedication[]
  >([]);
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMissed, setIsLoadingMissed] = useState<boolean>(true);
  const [isLoadingSideEffects, setIsLoadingSideEffects] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchDoctorPatients = async () => {
      try {
        // First get the doctor profile to get their ID
        const profileResponse = await api.get("/user/doctor");
        if (profileResponse.data.error) {
          throw new Error("Failed to fetch doctor profile");
        }

        console.log("Doctor Profile Response:", profileResponse.data);
        const doctorId = profileResponse.data.data.id;

        // Then fetch the doctor's patients
        const patientsResponse = await getDoctorPatients(doctorId);
        if (patientsResponse && patientsResponse.data) {
          setPatients(patientsResponse.data);
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.error("Error fetching doctor patients:", error);
        toast.error("Failed to load patients count");
        setPatients([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMissedMedications = async () => {
      try {
        const response = await getMissedPatientsMedication();
        if (response && response.data) {
          setMissedMedications(response.data);
        } else {
          setMissedMedications([]);
        }
      } catch (error) {
        console.error("Error fetching missed medications:", error);
        toast.error("Failed to load missed medications count");
        setMissedMedications([]);
      } finally {
        setIsLoadingMissed(false);
      }
    };

    const fetchLatestSideEffects = async () => {
      try {
        const response = await getLatestSideEffects();
        if (response && response.data && response.data.data) {
          setSideEffects(response.data.data);
        } else {
          setSideEffects([]);
        }
      } catch (error) {
        console.error("Error fetching latest side effects:", error);
        toast.error("Failed to load latest side effects");
        setSideEffects([]);
      } finally {
        setIsLoadingSideEffects(false);
      }
    };

    fetchDoctorPatients();
    fetchMissedMedications();
    fetchLatestSideEffects();
  }, []);

  // Calculate total missed medications
  const totalMissedMedications = missedMedications.reduce(
    (sum, item) => sum + item.counts,
    0
  );

  const data = {
    name: "Patients",
    quantity: isLoading ? 0 : patients.length,
    color: "border-r-blue-700",
  };

  const data2 = {
    name: "Total Medications Missed By Your Patients",
    quantity: isLoadingMissed ? 0 : totalMissedMedications,
    color: "border-r-green-600",
  };

  const data3 = {
    name: "Latest Side Effects Reported By Patients",
    quantity: isLoadingSideEffects ? 0 : sideEffects.length,
    color: "border-r-yellow-500",
  };

  const data4 = {
    name: "Current Side Effects",
    quantity: 30,
    color: "border-r-red-700",
  };

  return (
    <div className="flex justify-between gap-2 p-1">
      <div className="flex-1">
        <DoctorBanner />

        <p className="ml-2">This is the patient summary page</p>

        <div className="flex mx-auto gap-3">
          <StatCards content={data} />
          <StatCards content={data2} />
          <StatCards content={data3} />
          <StatCards content={data4} />
        </div>

        <div className="grid space-y-4 mt-3">
          <MissedMedicationChart />
          <LatestSideEffectsTable />
        </div>
      </div>

      <DoctorRightSideBar />
    </div>
  );
};

export default DoctorSummary;
