import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/UseProfile";
import { getPatientSideEffectsById } from "../../apis/PatientService";

// Define the type based on the expected response data
interface SideEffect {
  id: number;
  medicationName: string;
  date: string; // "12th June, 2024" format
  severity: "Mild" | "Moderate" | "Severe";
  description?: string;
}

const PatientSideEffectItem = () => {
  const { profile } = useProfile();
  const patientId = profile?.patient.id;
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPatientSideEffects = async (patientId: number) => {
      setIsLoading(true);
      try {
        const response = await getPatientSideEffectsById(patientId);
        if (response.data) {
          setSideEffects(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching side effects:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      getPatientSideEffects(patientId);
    } else {
      setIsLoading(false); // Set loading to false if no patientId is available
    }
  }, [patientId]);

  // Function to get the appropriate color for the severity badge
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "Severe":
        return "bg-orange-500 text-white";
      case "Moderate":
        return "bg-yellow-500 text-white";
      case "Mild":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse flex flex-col space-y-4 w-full">
          <div className="h-16 bg-gray-200 rounded-md w-full"></div>
          <div className="h-16 bg-gray-200 rounded-md w-full"></div>
          <div className="h-16 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {sideEffects.map((sideEffect) => (
        <div
          key={sideEffect.id}
          className="border border-gray-200 rounded-md p-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {sideEffect.medicationName}
              </h3>
              <p className="text-sm text-gray-500">{sideEffect.description}</p>
              <p className="text-xs text-gray-400 mt-1">{sideEffect.date}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-md text-xs font-medium ${getSeverityColor(
                sideEffect.severity
              )}`}
            >
              {sideEffect.severity}
            </div>
          </div>
        </div>
      ))}

      {!isLoading && sideEffects.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No side effects reported
        </div>
      )}
    </div>
  );
};

export default PatientSideEffectItem;
