import { useState, useEffect } from "react";
import Vitals from "./Vitals";
import { getPatientVitals } from "../apis/PatientService";

import { Vital, VitalsResponse } from "../types/types";
import { useProfile } from "../hooks/UseProfile";

function TotalVitals() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [vitalsData, setVitalsData] = useState<Vital[]>([]);

  const { profile } = useProfile();
  const userId = profile?.patient?.id;
  const fetchPatientVitals = async (patientId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: VitalsResponse = await getPatientVitals(patientId);
      if (!response.vitals) {
        throw new Error("No vitals data received from server");
      }
      setVitalsData(response.vitals);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch patient vitals"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPatientVitals(userId);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-between mt-4">
        <h4 className="ml-2 font-medium from-neutral-950">Current Vitals</h4>
        <div className="flex justify-between p-2">
          {/* Three loading placeholders for vital cards */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse w-1/3 px-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-between mt-4">
      <h4 className="ml-2 font-medium from-neutral-950">Current Vitals</h4>
      <div className="flex justify-between p-2">
        {vitalsData.map((vital, index) => (
          <Vitals
            key={index}
            content={{
              name: vital.name,
              quantity: parseFloat(vital.value),
              description: vital.isNormal ? "in the norm" : "out of norm",
              unit: vital.unit,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TotalVitals;
