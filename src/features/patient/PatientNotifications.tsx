import NotificationItem from "../../components/NotificationItem";
import { useEffect, useState } from "react";
import { getTodaysMedication } from "../../apis/PatientService";
import { useProfile } from "../../hooks/UseProfile";
import Loader from "../../components/Loader";
import { toast } from "sonner";

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

type FilterStatus = "all" | "pending" | "taken" | "missed";

const PatientNotifications = () => {
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingMedications, setPendingMedications] = useState<
    MedicationSchedule[]
  >([]);
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");

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

  const getFilteredMedications = () => {
    switch (currentFilter) {
      case "pending":
        return pendingMedications.filter((med) => med.status === "Pending");
      case "taken":
        return pendingMedications.filter((med) => med.status === "Taken");
      case "missed":
        return pendingMedications.filter((med) => med.status === "Missed");
      default:
        return pendingMedications;
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div>
        <h1 className="text-4xl font-bold mt-2">Notifications</h1>
        <p className="mt-4 text-gray-700">
          You have {pendingMedications.length} notifications
        </p>
      </div>

      <div className="flex gap-8 p-4">
        <button
          onClick={() => setCurrentFilter("all")}
          className={`hover:underline ${
            currentFilter === "all"
              ? "text-[#454BE7] font-semibold"
              : "text-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setCurrentFilter("pending")}
          className={`hover:underline ${
            currentFilter === "pending"
              ? "text-[#454BE7] font-semibold"
              : "text-gray-600"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setCurrentFilter("taken")}
          className={`hover:underline ${
            currentFilter === "taken"
              ? "text-[#454BE7] font-semibold"
              : "text-gray-600"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setCurrentFilter("missed")}
          className={`hover:underline ${
            currentFilter === "missed"
              ? "text-[#454BE7] font-semibold"
              : "text-gray-600"
          }`}
        >
          Missed
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {isLoading && (
          <div className="flex justify-center my-8">
            <Loader />
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
        )}

        {!isLoading && !error && (
          <div className="space-y-4">
            <h4 className="font-bold text-2xl">Today</h4>
            {getFilteredMedications().length === 0 ? (
              <p className="text-gray-500">
                No {currentFilter !== "all" ? `${currentFilter} ` : ""}
                medications found
              </p>
            ) : (
              getFilteredMedications().map((medication) => (
                <NotificationItem
                  key={medication.id}
                  medicationName={medication.medication.medication_name}
                  dosageStrength={medication.medication.dosage_strength}
                  doseTime={medication.dose_time}
                  status={medication.status}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNotifications;
