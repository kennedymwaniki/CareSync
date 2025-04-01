import { useEffect, useState } from "react";
import MiniDateComponent from "./MiniDateComponent";
import NotificationItem from "./NotificationItem";

import { getTodaysMedication } from "../apis/PatientService";
import { useProfile } from "../hooks/UseProfile";
import Loader from "./Loader";

// Define interfaces based on your API response structure
interface Medication {
  id: number;
  medication_name: string;
  dosage_strength: string;
}

interface MedicationSchedule {
  id: number;
  medication: Medication;
  dose_time: string;
  status: "Pending" | "Taken" | "Missed";
}

function RightSideBar() {
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [medications, setMedications] = useState<MedicationSchedule[]>([]);

  useEffect(() => {
    const fetchMedications = async () => {
      if (!profile?.patient?.id) return;

      try {
        const result = await getTodaysMedication(profile.patient.id);
        if (!result.error && result.schedules?.medications) {
          // Get only the first 3 pending medications for the sidebar
          const pendingMeds = result.schedules.medications.filter(
            (med) => med.status === "Pending"
          );
          setMedications(pendingMeds);
        }
      } catch (error) {
        console.error("Error fetching medications for sidebar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedications();
  }, [profile?.patient?.id]);

  return (
    <div className="w-80 mt-2 p-[10px] rounded-lg border border-gray-200 h-screen overflow-x-auto">
      <MiniDateComponent />
      <div className="space-y-[5px]">
        <h1 className="text-sm font-semibold">Upcoming Medications</h1>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader />
          </div>
        ) : medications.length > 0 ? (
          medications.map((med) => (
            <NotificationItem
              key={med.id}
              medicationName={med.medication.medication_name}
              dosageStrength={med.medication.dosage_strength}
              doseTime={med.dose_time}
              status={med.status}
            />
          ))
        ) : (
          <p className="text-xs text-gray-500 py-2">No upcoming medications</p>
        )}
      </div>
    </div>
  );
}

export default RightSideBar;
