import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Nodata from "../../assets/medication baner.png"; // Using the same no data image
import { parseISO, format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getPatientDiagnosis } from "../../apis/PatientService";
import Loader from "../../components/Loader";

interface Doctor {
  id: number;
  name: string;
  email: string;
}

interface Patient {
  id: number;
  name: string;
  email: string;
}

interface DiagnosisResponse {
  id: number;
  diagnosis_name: string;
  description: string | null;
  date_diagnosed: string;
  patient: Patient;
  doctor: Doctor;
  medication_counts: number;
}

interface ApiResponse {
  error: boolean;
  data: DiagnosisResponse[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}

interface FilterState {
  doctorName: string;
  date: string;
}

const PatientDiagnosis = () => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>({
    doctorName: "",
    date: "",
  });

  const patient = useSelector((state: RootState) => state.auth.user);

  // If we don't have a patient id we use id no. 2 for testing
  const patientId: number = patient?.id ?? 2;

  useEffect(() => {
    const getDiagnoses = async (patientId: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: ApiResponse = await getPatientDiagnosis(patientId);

        if (!response || !response.data) {
          throw new Error("No data received from server");
        }

        setDiagnoses(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch patient diagnoses"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      getDiagnoses(patientId);
    }
  }, [patientId]);

  const rowsPerPage: number = 5;

  const filteredDiagnoses = diagnoses.filter((diagnosis) => {
    if (
      filters.doctorName &&
      !diagnosis.doctor.name
        .toLowerCase()
        .includes(filters.doctorName.toLowerCase())
    ) {
      return false;
    }

    // Filter by date if selected
    if (filters.date) {
      const diagnosisDate = format(
        parseISO(diagnosis.date_diagnosed),
        "yyyy-MM-dd"
      );
      return diagnosisDate === filters.date;
    }

    return true;
  });

  const indexOfLastRow: number = currentPage * rowsPerPage;
  const indexOfFirstRow: number = indexOfLastRow - rowsPerPage;
  const currentRows: DiagnosisResponse[] = filteredDiagnoses.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages: number = Math.ceil(filteredDiagnoses.length / rowsPerPage);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearFilters = (): void => {
    setFilters({
      doctorName: "",
      date: "",
    });
    setCurrentPage(1);
  };

  // Render table body based on loading, error and data states
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-4">
            <Loader />
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-4">
            <p className="text-red-500">Error: {error}</p>
          </td>
        </tr>
      );
    }

    if (currentRows.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-4">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No diagnoses available</p>
          </td>
        </tr>
      );
    }

    return currentRows.map((diagnosis) => (
      <tr key={diagnosis.id} className="hover:bg-gray-50 text-sm text-nowrap">
        <td className="px-4 py-2 text-center">{diagnosis.patient.name}</td>
        <td className="px-4 py-2">{diagnosis.diagnosis_name}</td>
        <td className="px-4 py-2">
          {diagnosis.description || "No description"}
        </td>
        <td className="px-4 py-2">{diagnosis.doctor.name}</td>
        <td className="px-4 py-2">
          {format(parseISO(diagnosis.date_diagnosed), "yyyy-MM-dd")}
        </td>
        <td className="px-4 py-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            View
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Patient Diagnoses</h1>
        <div className="flex gap-4">
          {/* Doctor Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="doctorFilter" className="text-sm">
              Doctor:
            </label>
            <input
              type="text"
              id="doctorFilter"
              name="doctorName"
              className="border rounded px-2 py-1"
              placeholder="Filter by doctor"
              value={filters.doctorName}
              onChange={handleFilterChange}
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="dateFilter" className="text-sm">
              Date:
            </label>
            <input
              type="date"
              id="dateFilter"
              name="date"
              className="border rounded px-2 py-1"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>

          {/* Clear Filters Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={clearFilters}
          >
            <FiFilter /> Clear
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-sm text-nowrap border-b-2">
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Diagnosis Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Doctor</th>
              <th className="px-4 py-2">Date Diagnosed</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      {filteredDiagnoses.length > rowsPerPage && (
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

export default PatientDiagnosis;
