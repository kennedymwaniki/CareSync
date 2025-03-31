import { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO, isFuture } from "date-fns";
import { toast } from "sonner";

interface MedicationScheduleProps {
  id: number;
  medication_name: string;
  dosage_strength: string;
  dose_time: string;
  status: "Pending" | "Taken" | "Missed";
}

interface ReminderItemProps {
  medicationSchedule: MedicationScheduleProps;
  onTakeMedication?: (id: number) => Promise<void>;
}

const ReminderItem = ({
  medicationSchedule,
  onTakeMedication,
}: ReminderItemProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const [isPastDoseTime, setIsPastDoseTime] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("ReminderItem Props:", medicationSchedule);
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("Current Time:", currentTime);

  // Parse the dose time to a Date object
  const doseTime = parseISO(medicationSchedule.dose_time);

  useEffect(() => {
    const updateTimeDisplay = () => {
      if (isFuture(doseTime)) {
        // If dose time is in the future
        setTimeRemaining(formatDistanceToNow(doseTime, { addSuffix: false }));
        setIsPastDoseTime(false);
      } else {
        // If dose time is in the past
        setTimeElapsed(formatDistanceToNow(doseTime, { addSuffix: false }));
        setIsPastDoseTime(true);
      }
    };

    // Initial update
    updateTimeDisplay();

    // Set interval to update every minute
    const interval = setInterval(updateTimeDisplay, 60000);

    // Clean up on unmount
    return () => clearInterval(interval);
  }, [doseTime]);

  const handleTakeMedication = async () => {
    if (onTakeMedication && medicationSchedule.id) {
      setIsLoading(true);
      try {
        await onTakeMedication(medicationSchedule.id);
        toast.success("Medication marked as taken");
      } catch (error) {
        toast.error("Failed to mark medication as taken");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-[#454BE7]">
      <p className="text-sm text-gray-500 mb-2">
        {isPastDoseTime ? (
          `You were to take this  in the past ${timeElapsed}`
        ) : (
          <div className="flex justify-between">
            <span>{` You are to take this In ${timeRemaining}`}</span>
            <span className="text-gray-400">{currentTime}</span>
          </div>
        )}
      </p>
      <h3 className="text-lg font-semibold mb-3">Take Medication</h3>
      <div className="mb-4">
        <p className="font-medium">{medicationSchedule.medication_name}</p>
        <p className="text-sm text-gray-600">
          {medicationSchedule.dosage_strength}
        </p>
      </div>

      {/* Display status indicator for all medications */}
      <div
        className={`mb-3 px-2 py-1 rounded-md inline-block text-sm ${
          medicationSchedule.status === "Taken"
            ? "bg-green-100 text-green-800"
            : medicationSchedule.status === "Missed"
            ? "bg-red-100 text-red-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {medicationSchedule.status}
      </div>

      {/* Only show the "Mark as Taken" button for medications that aren't already taken */}
      {isPastDoseTime && medicationSchedule.status !== "Taken" && (
        <button
          onClick={handleTakeMedication}
          disabled={isLoading}
          className="w-auto ml-4 py-1 px-2 bg-[#454BE7] text-white rounded-md hover:bg-[#3a3fc9] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Marking as taken..." : "Mark as Taken"}
        </button>
      )}
    </div>
  );
};

export default ReminderItem;
