import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Vitals from "./Vitals";
import { getPatientVitals } from "../apis/PatientService";
import { RootState } from "../app/store";
import { Vital, VitalsResponse } from "../types/types";

function TotalVitals() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [vitalsData, setVitalsData] = useState<Vital[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  // ! if there no no loggedin user Id no 2 will be the default id for testing porposes
  const userId = user?.id ?? 2;
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
    return <div>Loading vitals...</div>;
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
