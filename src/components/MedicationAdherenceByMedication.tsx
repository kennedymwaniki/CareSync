import React from "react";
import { toast } from "sonner";
import { getPatientMedicationAdherenceByMedication } from "../apis/PatientService";
import { useProfile } from "../hooks/UseProfile";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define types for the adherence data
interface MedicationAdherenceData {
  medication_id: number;
  medication_name: string;
  total_scheduled: number;
  total_taken: number;
  adherence_percentage: number;
}

interface ChartDataItem {
  name: string;
  taken: number;
  missed: number;
}

export interface MedicationAdherenceResponse {
  error: boolean;
  data: MedicationAdherenceData[];
  message: string;
}

const MedicationAdherenceByMedication: React.FC = () => {
  const { profile } = useProfile();
  const [adherence, setAdherence] = useState<MedicationAdherenceData[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const patient_id = profile?.patient?.id;

  useEffect(() => {
    const getMedicationAdherenceByMedication = async (patient_id: number) => {
      try {
        const response = await getPatientMedicationAdherenceByMedication(
          patient_id
        );
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
        } else {
          setError("An unknown error occurred");
          console.error("Unknown error fetching adherence data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (patient_id) {
      getMedicationAdherenceByMedication(patient_id);
    }
  }, [patient_id]);

  // Transform the data for the chart to show taken and missed medications
  const transformDataForChart = (
    data: MedicationAdherenceData[]
  ): ChartDataItem[] => {
    return data.map((item) => ({
      name: item.medication_name,
      taken: item.total_taken,
      missed: item.total_scheduled - item.total_taken,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!adherence || adherence.length === 0) {
    return (
      <div
        className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">
          No medication adherence data available.
        </span>
      </div>
    );
  }

  const chartData = transformDataForChart(adherence);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Medication Adherence</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="taken" name="Doses Taken" fill="#4ade80" />
            <Bar dataKey="missed" name="Doses Missed" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adherence.map((med) => (
            <div key={med.medication_id} className="border rounded-md p-3">
              <h4 className="font-medium">{med.medication_name}</h4>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Adherence Rate:</span>
                  <span
                    className={
                      med.adherence_percentage > 50
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {med.adherence_percentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taken:</span>
                  <span className="text-green-600">
                    {med.total_taken} of {med.total_scheduled}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Missed:</span>
                  <span className="text-red-600">
                    {med.total_scheduled - med.total_taken} of{" "}
                    {med.total_scheduled}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationAdherenceByMedication;
