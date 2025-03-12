/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Nodata from "../../assets/carepulse banner.png"; // Replace with your actual no data image path

// Define types
interface Medication {
  id: number;
  medicationName: string;
  fullName: string;
  email: string;
  dosage: string;
  frequency: string;
  doctor: string;
  adherence: string;
  nextIn: string;
}

interface FilterOption {
  id: string;
  text: string;
}

const MedicationManagement: React.FC = () => {
  const [_medications, _setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [error, _setError] = useState<string | null>(null);
  const [loading, _setLoading] = useState<boolean>(false);

  // Dummy function to get medication data
  const getMedicationData = (): Medication[] => {
    return [];
  };

  console.log(getMedicationData);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Sample data for testing
  const sampleMedications: Medication[] = [
    {
      id: 1,
      medicationName: "Amoxicillin",
      fullName: "John Doe",
      email: "john@example.com",
      dosage: "3 pills",
      frequency: "2 times",
      doctor: "Dr Stan",
      adherence: "90%",
      nextIn: "in 2hrs",
    },
    {
      id: 2,
      medicationName: "Ibuprofen",
      fullName: "Jane Smith",
      email: "jane@example.com",
      dosage: "1 pill",
      frequency: "3 times",
      doctor: "Dr Johnson",
      adherence: "85%",
      nextIn: "in 1hr",
    },
    {
      id: 3,
      medicationName: "Aspirin",
      fullName: "Robert Brown",
      email: "robert@example.com",
      dosage: "2 pills",
      frequency: "1 time",
      doctor: "Dr Stan",
      adherence: "75%",
      nextIn: "in 3hrs",
    },
  ];

  // Filter the medications based on search term
  const filteredMedications: Medication[] = sampleMedications.filter((med) => {
    return (
      med.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Toggle filter dropdown
  const toggleFilter = (): void => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Filter time options
  const filterOptions: FilterOption[] = [
    { id: "1hr", text: "in 1hr" },
    { id: "2hrs", text: "in 2hrs" },
    { id: "3hrs", text: "in 3hrs" },
  ];

  // Handle filter option selection
  const selectFilterOption = (option: FilterOption): void => {
    // Implementation would go here
    console.log(option);
    setIsFilterOpen(false);
  };

  // Render table body based on loading, error and data states
  const renderTableBody = (): JSX.Element => {
    if (loading) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-4">
            <p className="text-red-500">Error: {error}</p>
          </td>
        </tr>
      );
    }

    if (filteredMedications.length === 0) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-8">
            <img src={Nodata} alt="No Data" className="mx-auto w-64 h-64" />
            <p className="mt-4 text-gray-500">No medications available</p>
          </td>
        </tr>
      );
    }

    return (
      <>
        {filteredMedications.map((med, index) => (
          <tr
            key={med.id}
            className={`text-sm hover:bg-gray-100 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="px-4 py-3">{med.medicationName}</td>
            <td className="px-4 py-3">{med.fullName}</td>
            <td className="px-4 py-3">{med.email}</td>
            <td className="px-4 py-3">{med.dosage}</td>
            <td className="px-4 py-3">{med.frequency}</td>
            <td className="px-4 py-3">{med.doctor}</td>
            <td className="px-4 py-3">{med.adherence}</td>
            <td className="px-4 py-3">{med.nextIn}</td>
            <td className="px-4 py-3">
              <button className="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
                <BsThreeDotsVertical />
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="p-6 bg-white  shadow h-screen mx-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Medication Management
        </h1>
      </div>

      <div className="flex flex-col-3 items-center justify-between mb-4 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div></div>
          <div className="relative">
            <button
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={toggleFilter}
            >
              <FiFilter />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul>
                  {filterOptions.map((option) => (
                    <li
                      key={option.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectFilterOption(option)}
                    >
                      {option.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search name,email,phone..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="px-4 py-3 font-medium">Medication Name</th>
              <th className="px-4 py-3 font-medium">Full Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Dosage</th>
              <th className="px-4 py-3 font-medium">Frequency</th>
              <th className="px-4 py-3 font-medium">Doctor</th>
              <th className="px-4 py-3 font-medium">Adherence</th>
              <th className="px-4 py-3 font-medium">Next in</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicationManagement;
