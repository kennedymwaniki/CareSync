/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import Nodata from "../assets/medication baner.png";
import { isToday } from "date-fns";
interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  prescriber: string;
  instructions: string;
  status: string;
  notes: string;
}

const MedicationsTable: React.FC = () => {
  // Dummy data for medications
  const dummyMedications: Medication[] = [
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "Twice a day",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      prescriber: "Dr. Smith",
      instructions: "After meals",
      status: "Active",
      notes: "N/A",
    },
    {
      id: 2,
      name: "Amoxicillin",
      dosage: "250mg",
      frequency: "Three times a day",
      startDate: "2025-01-16",
      endDate: "2025-01-19",
      prescriber: "Dr. Brown",
      instructions: "Before meals",
      status: "Active",
      notes: "Take with water",
    },
    {
      id: 3,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "Once a day",
      startDate: "2025-01-15",
      endDate: "2025-01-18",
      prescriber: "Dr. Adams",
      instructions: "After meals",
      status: "Active",
      notes: "N/A",
    },
    {
      id: 4,
      name: "Aspirin",
      dosage: "100mg",
      frequency: "Twice a day",
      startDate: "2025-01-15",
      endDate: "2025-01-18",
      prescriber: "Dr. Carter",
      instructions: "Before meals",
      status: "Active",
      notes: "Avoid alcohol",
    },
    {
      id: 5,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Once a day",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      prescriber: "Dr. Lee",
      instructions: "After meals",
      status: "Active",
      notes: "Monitor blood sugar",
    },
    {
      id: 6,
      name: "Ciprofloxacin",
      dosage: "500mg",
      frequency: "Twice a day",
      startDate: "2025-01-17",
      endDate: "2025-01-19",
      prescriber: "Dr. Johnson",
      instructions: "Before meals",
      status: "Active",
      notes: "Avoid sunlight",
    },
  ];

  const [medications, setMedications] =
    useState<Medication[]>(dummyMedications);
  const [filter, setFilter] = useState<"All" | "Today">("All");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;
  const today = isToday(new Date())
    ? new Date().toISOString().split("T")[0]
    : "";

  // Filter medications based on filter type
  const filteredMedications = medications.filter((med) => {
    if (filter === "Today") {
      return med.startDate <= today && med.endDate >= today;
    }
    return true;
  });

  // Pa
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMedications.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredMedications.length / rowsPerPage);

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
                  <td className="px-4 py-2">{med.name}</td>
                  <td className="px-4 py-2">{med.dosage}</td>
                  <td className="px-4 py-2">{med.frequency}</td>
                  <td className="px-4 py-2">{med.startDate}</td>
                  <td className="px-4 py-2">{med.endDate}</td>
                  <td className="px-4 py-2">{med.prescriber}</td>
                  <td className="px-4 py-2">{med.instructions}</td>
                  <td className="px-4 py-2">{med.status}</td>
                  <td className="px-4 py-2">{med.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  <img
                    src={Nodata}
                    alt="No Data"
                    className="mx-auto w-40 h-40"
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
