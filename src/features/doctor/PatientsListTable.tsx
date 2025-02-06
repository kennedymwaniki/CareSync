import { useState } from "react";

type Patient = {
  profile: string;
  fullname: string;
  email: string;
  age: number;
  main_Doctor: string;
  current_diagnosis: string;
  adherence_percentage: string;
};

const PatientsListTable = () => {
  const patientData: Patient[] = [
    {
      profile: "https://via.placeholder.com/40",
      fullname: "John Doe",
      email: "john.doe@example.com",
      age: 30,
      main_Doctor: "Dr. Smith",
      current_diagnosis: "Flu",
      adherence_percentage: "90%",
    },
    {
      profile: "https://via.placeholder.com/40",
      fullname: "Jane Roe",
      email: "jane.roe@example.com",
      age: 27,
      main_Doctor: "Dr. Adams",
      current_diagnosis: "Cold",
      adherence_percentage: "85%",
    },
    {
      profile: "https://via.placeholder.com/40",
      fullname: "Alice Brown",
      email: "alice.brown@example.com",
      age: 45,
      main_Doctor: "Dr. Baker",
      current_diagnosis: "Diabetes",
      adherence_percentage: "80%",
    },
    {
      profile: "https://via.placeholder.com/40",
      fullname: "Bob Green",
      email: "bob.green@example.com",
      age: 50,
      main_Doctor: "Dr. Johnson",
      current_diagnosis: "Hypertension",
      adherence_percentage: "95%",
    },
    {
      profile: "https://via.placeholder.com/40",
      fullname: "Carol White",
      email: "carol.white@example.com",
      age: 35,
      main_Doctor: "Dr. Lee",
      current_diagnosis: "Asthma",
      adherence_percentage: "88%",
    },
  ];

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPersons = patientData.filter((patient) =>
    patient.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="font-bold text-3xl">Patients</h1>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Search name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto px-4 py-2 border rounded-md"
        />
      </div>
      <table className="min-w-full mx-auto mt-4">
        <thead>
          <tr className="text-sm text-nowrap border-b-2">
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Main Doctor</th>
            <th className="px-4 py-2">Current Diagnosis</th>
            <th className="px-4 py-2">Adherence Percentage</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons.length > 0 ? (
            filteredPersons.map((patient, index) => (
              <tr key={index} className="hover:bg-gray-50 text-sm text-nowrap">
                <td className="px-4 py-2">
                  <img
                    src={patient.profile}
                    alt={patient.fullname}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{patient.fullname}</td>
                <td className="px-4 py-2">{patient.email}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.main_Doctor}</td>
                <td className="px-4 py-2">{patient.current_diagnosis}</td>
                <td className="px-4 py-2">{patient.adherence_percentage}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No Patients data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsListTable;
