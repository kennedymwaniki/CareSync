import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { getPatientSideEffects } from "../../apis/PatientService";

import Nodata from "../../assets/medication baner.png";
import type { SideEffect, SideEffectApiResponse } from "../../types/types";
import { toast } from "sonner";

interface PatientSideEffectTableProps {
  patient_id: number;
}

const PatientSideEffectTable = ({
  patient_id,
}: PatientSideEffectTableProps) => {
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSideEffects = async () => {
      if (!patient_id) return;

      setIsLoading(true);
      setError(null);

      try {
        const response: SideEffectApiResponse = await getPatientSideEffects(
          patient_id
        );
        if (!response.data || response.data.length === 0) {
          // No need to show error toast for empty data
          console.log("No side effects found for this patient");
        }
        setSideEffects(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch side effects"
        );
        toast.error("An error occurred while fetching the side effects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSideEffects();
  }, [patient_id]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-500 text-center">Error: {error}</p>
      </div>
    );
  }

  if (sideEffects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
        <p className="mt-4 text-gray-500">No side effects reported</p>
      </div>
    );
  }

  return (
    <div className=" bg-white rounded-md shadow-md ml-2 mr-4 border">
      <div className="overflow-x-auto">
        <h1 className="p-4 font-bold text-xl">
          Patient's Reported SideEffects
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medication
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Side Effect
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sideEffects.map((effect, index) => (
              <tr
                key={effect.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {effect.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {effect.medication.medication_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {effect.side_effect}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      effect.severity === "Mild"
                        ? "bg-green-100 text-green-800"
                        : effect.severity === "Moderate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {effect.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {`${effect.duration} days`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(parseISO(effect.datetime), "yyyy-MM-dd HH:mm")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {effect.notes || "No notes"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientSideEffectTable;
