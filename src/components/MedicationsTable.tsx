/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Nodata from "../assets/medication baner.png";
import { isToday, parseISO, isWithinInterval } from "date-fns";
import { useSelector } from "react-redux";
import { addDays, format } from "date-fns";
import { ApiResponse, MedicationResponse } from "../types/types";

import { RootState } from "../app/store";
import { getPatientMedication } from "../apis/PatientService";

interface EnhancedMedication extends MedicationResponse {
  calculatedEndDate: string;
}

const MedicationsTable = () => {
  const [medications, setMedications] = useState<EnhancedMedication[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<"All" | "Today">("All");
  const [currentPage, setCurrentPage] = useState(1);

  const patient = useSelector((state: RootState) => state.auth.user);
  console.log(patient);
  // ! this is for testing the 422 error restore the origina ID
  const patientId = patient?.id || 1;
  console.log(patientId);

  const calculateEndDate = (startDate: string, duration: string): string => {
    const durationMatch = duration.match(/(\d+)\s*days?/i);
    if (!durationMatch) return "";

    const days = parseInt(durationMatch[1]);
    const date = parseISO(startDate);
    return format(addDays(date, days), "yyyy-MM-dd");
  };

  const getMedications = async (patientId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: ApiResponse = await getPatientMedication(patientId);
      if (!response.data) {
        throw new Error("No data received from server");
      }
      // end date for each medication
      const enhancedMedications = response.data.map((med) => ({
        ...med,
        calculatedEndDate: calculateEndDate(med.prescribed_date, med.duration),
      }));
      setMedications(enhancedMedications);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch patient medications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      getMedications(patientId);
    }
  }, [patientId]);

  if (loading) {
    return <div>Loading Medication...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const rowsPerPage = 5;
  const _today = isToday(new Date())
    ? new Date().toISOString().split("T")[0]
    : "";

  const filteredMedications = medications.filter((med) => {
    if (filter === "Today") {
      const startDate = parseISO(med.prescribed_date);
      const endDate = parseISO(med.calculatedEndDate);
      const today = new Date();

      return isWithinInterval(today, {
        start: startDate,
        end: endDate,
      });
    }
    return true;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMedications.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredMedications.length / rowsPerPage);

  // Helper function to calculate end date

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Medications</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setFilter(filter === "All" ? "Today" : "All")}
        >
          <FiFilter /> {filter === "All" ? "Today" : "Active"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-auto">
          <thead>
            <tr className="text-sm text-nowrap border-b-2">
              <th className="px-4 py-2 ">ID</th>
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Dosage</th>
              <th className="px-4 py-2 ">Frequency</th>
              <th className="px-4 py-2 ">Start Date</th>
              <th className="px-4 py-2 ">End Date</th>
              <th className="px-4 py-2 ">Prescriber</th>
              <th className="px-4 py-2 ">Instructions</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((med) => (
                <tr
                  key={med.id}
                  className="hover:bg-gray-50 text-sm text-nowrap"
                >
                  <td className="px-4 py-2 text-center">{med.id}</td>
                  <td className="px-4 py-2">{med.medication_name}</td>
                  <td className="px-4 py-2">{`${med.dosage_quantity} ${med.dosage_strength}`}</td>
                  <td className="px-4 py-2">{med.frequency}</td>
                  <td className="px-4 py-2">
                    {format(parseISO(med.prescribed_date), "yyyy-MM-dd")}
                  </td>
                  <td className="px-4 py-2">{med.calculatedEndDate}</td>
                  <td className="px-4 py-2">{med.doctor.name}</td>
                  <td className="px-4 py-2">{`${med.route.name} - ${med.form.name}`}</td>
                  <td className="px-4 py-2">
                    {med.active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2">
                    {/* Add your action buttons here */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  <img
                    src={Nodata}
                    alt="No Data"
                    className="mx-auto w-80 h-80"
                  />
                  <p className="mt-4 text-gray-500">No medications available</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredMedications.length > rowsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } hover:bg-blue-600 hover:text-white`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationsTable;
