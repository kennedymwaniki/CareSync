import { useState, useEffect } from "react";
import StatCards from "../../components/StatCards";
import CareProviderBanner from "./CareeProviderBannner";
import CareGiverRightSideBar from "./CareGiverRightSideBar";
import MissedMedicationChart from "../doctor/MissedMedicationChart";
import LatestSideEffectsTable from "../doctor/LastSideEffectsTable";
import { getCareGiverPatients } from "../../apis/CareGiverServive";
import {
  getLatestSideEffects,
  getMissedPatientsMedication,
} from "../../apis/DoctorService";
import api from "../../../axios";
import { toast } from "sonner";

export interface CareGiverProfile {
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
  };
}

interface MissedMedication {
  patient_id: number;
  patient_name: string;
  counts: number;
}

const CareProviderSummary = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [missedMedications, setMissedMedications] = useState<
    MissedMedication[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSideEffects, setIsLoadingSideEffects] =
    useState<boolean>(true);
  const [isLoadingMissed, setIsLoadingMissed] = useState<boolean>(true);

  useEffect(() => {
    const fetchCareGiverPatients = async () => {
      try {
        // First get the caregiver profile to get their ID
        const profileResponse = await api.get("/user/caregiver");
        if (profileResponse.data.error) {
          throw new Error("Failed to fetch caregiver profile");
        }

        const caregiverId = profileResponse.data.data.id;

        // Then fetch the caregiver's patients
        const patientsResponse = await getCareGiverPatients(caregiverId);
        if (patientsResponse && patientsResponse.data) {
          setPatients(patientsResponse.data.data);
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.error("Error fetching caregiver patients:", error);
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

    fetchCareGiverPatients();
    fetchMissedMedications();
    fetchLatestSideEffects();
  }, []);

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
    name: "Latest Side Effects Reported",
    quantity: isLoadingSideEffects ? 0 : sideEffects.length,
    color: "border-r-yellow-500",
  };

  return (
    <div className="flex justify-between gap-2 p-1">
      <div className="flex-1">
        <CareProviderBanner />

        <p className="ml-2">Caregiver Dashboard Overview</p>

        <div className="flex mx-auto gap-3">
          <StatCards content={data} />
          <StatCards content={data2} />
          <StatCards content={data3} />
        </div>

        <div className="grid space-y-4 mt-3">
          <MissedMedicationChart />
          <LatestSideEffectsTable />
        </div>
      </div>

      <CareGiverRightSideBar />
    </div>
  );
};

export default CareProviderSummary;
