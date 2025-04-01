import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { getMissedPatientsMedication } from "../../apis/DoctorService";

const MissedMedicationChart = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMissedMedication = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getMissedPatientsMedication();
        if (!response || !response.data) {
          throw new Error("No data received from server");
        }
        setDatas(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error(
            "Error fetching missed medication data:",
            error.message
          );
        } else {
          setError("An unexpected error occurred while fetching data");
          console.error("An unexpected error occurred while fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    getMissedMedication();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-80 rounded-md shadow-md flex justify-center items-center bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">
            Loading missed medication data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-80 rounded-md shadow-md flex justify-center items-center bg-white">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading chart
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!datas || datas.length === 0) {
    return (
      <div className="w-full h-80 rounded-md shadow-md flex justify-center items-center bg-white">
        <div className="text-center">
          <svg
            className="h-12 w-12 text-gray-400 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-2 text-gray-500">
            No missed medication data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-md shadow-md flex flex-col justify-center items-center bg-white p-4">
      <h3 className="text-lg font-semibold mb-4">
        Missed Medication by Patient
      </h3>
      <BarChart width={600} height={300} data={datas}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="patient_name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="counts" fill="#7c46d4c4" name="Missed Medications" />
      </BarChart>
    </div>
  );
};

export default MissedMedicationChart;
