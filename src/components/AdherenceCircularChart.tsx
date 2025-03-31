import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getPatientMedicalAdherence } from "../apis/PatientService";
import { useProfile } from "../hooks/UseProfile";
import { toast } from "sonner";

// Define the interface for adherence data structure
interface AdherenceData {
  total_scheduled: number;
  total_taken: number;
  adherence_percentage: number;
  from_date: string;
  to_date: string;
}

const AdherenceCircularChart = () => {
  const [adherence, setAdherence] = useState<AdherenceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { profile } = useProfile();
  const patient_id = profile?.patient?.id;

  useEffect(() => {
    const fetchAdherence = async (patientId: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPatientMedicalAdherence(patientId);
        if (response.data) {
          setAdherence(response.data);
          toast.success("Adherence data fetched successfully");
        } else {
          setError("No adherence data found");
          console.log("No adherence data found for this patient");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("Error fetching adherence data:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (patient_id) {
      fetchAdherence(patient_id);
    }
  }, [patient_id]);

  // Data for the pie chart
  const adherenceRate = adherence?.adherence_percentage ?? 0;
  const data = [
    { name: "Adherent", value: adherenceRate },
    { name: "Non-Adherent", value: 100 - adherenceRate },
  ];

  // Colors for the chart
  const COLORS = ["#8884ff", "#f0f0f0db"];

  if (isLoading) {
    return (
      <div className="w-full max-w-xs bg-white rounded-lg shadow-sm p-4 m-4 border flex justify-center items-center h-64">
        Loading adherence data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xs bg-white rounded-lg shadow-sm p-4 m-4 border flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-sm p-4 m-4 border">
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        Medication Compliance Rate
      </h3>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={0}
              outerRadius={80}
              dataKey="value"
              stroke="#e0e0e06b"
              strokeWidth={1}
            >
              <Cell key={`cell-0`} fill={COLORS[0]} />
              <Cell key={`cell-1`} fill={COLORS[1]} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="block text-3xl font-bold text-gray-800">
              {adherenceRate}%
            </span>
            <span className="text-sm text-gray-500">Adherence</span>
          </div>
        </div>
      </div>
      {adherence && (
        <div className="mt-4 text-xs text-gray-600">
          <p>Total Scheduled: {adherence.total_scheduled}</p>
          <p>Total Taken: {adherence.total_taken}</p>
          <p className="text-xs mt-2">
            From {new Date(adherence.from_date).toLocaleDateString()} to{" "}
            {new Date(adherence.to_date).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdherenceCircularChart;
