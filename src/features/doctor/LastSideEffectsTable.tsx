import React from "react";

interface SideEffectData {
  sideEffect: string;
  medication: string;
  patientName: string;
  frequency: string;
  severity: string;
  dateTime: string;
}

const LatestSideEffectsTable: React.FC = () => {
  // Dummy data for the table
  const sideEffectsData: SideEffectData[] = [
    {
      sideEffect: "Nausea",
      medication: "Lisinopril",
      patientName: "Jamie",
      frequency: "Daily",
      severity: "Moderate",
      dateTime: "2025-03-09 14:32:00",
    },
    {
      sideEffect: "Headache",
      medication: "Atorvastatin",
      patientName: "Lesley",
      frequency: "Occasionally",
      severity: "Mild",
      dateTime: "2025-03-09 10:15:00",
    },
    {
      sideEffect: "Dizziness",
      medication: "Metoprolol",
      patientName: "Limo",
      frequency: "Weekly",
      severity: "Severe",
      dateTime: "2025-03-08 16:45:00",
    },
    {
      sideEffect: "Insomnia",
      medication: "Prednisone",
      patientName: "Mr Cooper",
      frequency: "Nightly",
      severity: "Moderate",
      dateTime: "2025-03-08 08:20:00",
    },
    {
      sideEffect: "Rash",
      medication: "Amoxicillin",
      patientName: "Goldon",
      frequency: "Once",
      severity: "Mild",
      dateTime: "2025-03-07 13:10:00",
    },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Latest Side Effects</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Side Effect
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DateTime
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sideEffectsData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.sideEffect}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.medication}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.frequency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      item.severity === "Mild"
                        ? "bg-green-100 text-green-800"
                        : item.severity === "Moderate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.dateTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestSideEffectsTable;
