import React, { useEffect, useState } from "react";
import { getTopAdheringPatients } from "../apis/DoctorService";

interface Patient {
  id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
  };
}

interface AdherencePatient {
  patient: Patient;
  adherence_percentage: number;
}

const TopAdherencePatients: React.FC = () => {
  const [topAdherencePatients, setTopAdherencePatients] = useState<
    AdherencePatient[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopAdheringPatients = async () => {
      try {
        const response = await getTopAdheringPatients();
        if (!response || !response.top_adhering_patients) {
          throw new Error("No data received from server");
        }
        setTopAdherencePatients(response.top_adhering_patients);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to fetch top adhering patients: ${error.message}`);
        } else {
          setError("An unexpected error occurred while fetching data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTopAdheringPatients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" w-1/2 p-4 bg-white shadow rounded-md border mr-4">
      <h2 className="text-lg font-semibold mb-4">Top Adherence Patients</h2>
      <ul>
        {topAdherencePatients.map(({ patient, adherence_percentage }) => (
          <li
            key={patient.id}
            className="flex items-center justify-between border-b py-3"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Patient"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{patient.user.name}</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-md text-white font-medium ${
                adherence_percentage > 70 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {adherence_percentage.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAdherencePatients;
