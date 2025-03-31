import { useEffect, useState } from "react";
import {
  getTodaysMedication,
  markMedicationAsTaken,
} from "../apis/PatientService";
import { useProfile } from "../hooks/UseProfile";
import ReminderItem from "./ReminderItem";
import Loader from "./Loader";
import { toast } from "sonner";

// Types for medication data
interface Medications {
  id: number;
  medication_name: string;
  dosage_strength: string;
  dosage_quantity: string;
  form_id: number;
  route_id: number;
  frequency: string;
  duration: string;
  prescribed_date: string;
  active: number;
}

interface MedicationSchedules {
  id: number;
  medication_id: number;
  dose_time: string;
  status: "Pending" | "Taken" | "Missed";
  medication: Medications;
}

export interface MedicationSchedulesResponse {
  error: boolean;
  schedules: {
    medications: MedicationSchedules[];
  };
}

const ReminderSideBar = () => {
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingMedications, setPendingMedications] = useState<
    MedicationSchedules[]
  >([]);

  useEffect(() => {
    const fetchTodaysMedication = async () => {
      if (!profile?.patient?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await getTodaysMedication(profile.patient.id);

        if (result.error) {
          throw new Error("Failed to fetch today's medications");
        }
        console.log(result.schedules.medications); // Log the medications for debugging

        // Show all medications regardless of status
        setPendingMedications(result.schedules.medications);

        if (result.schedules.medications.length === 0) {
          toast.info("No medications scheduled for today");
        }
      } catch (error) {
        console.error("Error fetching medications:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        toast.error("Failed to load medications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodaysMedication();
  }, [profile?.patient?.id]);

  // Function to mark medication as taken
  const handleTakeMedication = async (scheduleId: number) => {
    try {
      // Get current timestamp in ISO format
      const takenTime = new Date().toISOString();

      // Call the API to mark medication as taken with the timestamp
      const response = await markMedicationAsTaken(scheduleId, takenTime);

      // Check if the response was successful
      if (response && !response.error) {
        // Update local state to reflect the change
        setPendingMedications((prevMeds) =>
          prevMeds.map((med) =>
            med.id === scheduleId
              ? { ...med, status: "Taken" as "Pending" | "Taken" | "Missed" }
              : med
          )
        );

        // Show success toast
        toast.success("Medication marked as taken successfully");
        return Promise.resolve();
      } else {
        // If there was an error in the response
        const errorMsg =
          response?.message || "Failed to mark medication as taken";
        toast.error(errorMsg);
        return Promise.reject(new Error(errorMsg));
      }
    } catch (error) {
      // Handle any exceptions
      console.error("Failed to mark medication as taken:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
      return Promise.reject(error);
    }
  };

  return (
    <div className="w-96 p-5 bg-[#EDF3FF]">
      <h2 className="text-xl font-semibold mb-4">Today's Medications</h2>

      {isLoading && (
        <div className="flex justify-center my-8">
          <Loader />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
      )}

      {!isLoading && !error && pendingMedications.length === 0 && (
        <div className="p-4 bg-gray-100 text-gray-600 rounded-md text-center">
          No pending medications for today
        </div>
      )}

      {pendingMedications.map((medication) => (
        <ReminderItem
          key={medication.id}
          medicationSchedule={{
            id: medication.id,
            medication_name: medication.medication.medication_name,
            dosage_strength: medication.medication.dosage_strength,
            dose_time: medication.dose_time,
            status: medication.status as "Pending" | "Taken" | "Missed",
          }}
          onTakeMedication={handleTakeMedication}
        />
      ))}
    </div>
  );
};

export default ReminderSideBar;
