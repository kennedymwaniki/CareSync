import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { getDiagnosisById } from "../../apis/DiagnosisService";
import { toast } from "sonner";

import Nodata from "../../assets/medication baner.png";
import Modal from "../../components/Modal";
import DiagnosisForm from "../../components/DiagnosisForm";

export interface PatientDiagnosisTableProps {
  patient_id: number;
}

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
  symptoms: string | null;
  date_diagnosed: string;
  patient: Patient;
  doctor: Doctor;
  medication_counts: number;
}

export interface ApiResponse {
  error: boolean;
  data: DiagnosisResponse[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}

const PatientDiagnosisTable = ({ patient_id }: { patient_id: number }) => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchDiagnoses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDiagnosisById(patient_id);
      if (!response || !response.data || !response.data.data) {
        setDiagnoses([]);
        return;
      }
      setDiagnoses(response.data.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch diagnoses";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnoses();
  }, [patient_id]);

  const handleDiagnosisAdded = () => {
    setIsModalOpen(false);
    fetchDiagnoses();
    toast.success("Diagnosis added successfully");
  };

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

  const renderTableBody = () => {
    if (error) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-4 text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (diagnoses.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-4">
            <div className="flex flex-col items-center">
              <img src={Nodata} alt="No Data" className="w-12 h-12" />
              <p className="text-gray-500">
                No diagnoses available for this patient
              </p>
            </div>
          </td>
        </tr>
      );
    }

    return diagnoses.map((diagnosis) => (
      <tr key={diagnosis.id} className="hover:bg-gray-100 text-sm text-nowrap ">
        <td className="px-4 py-2">{diagnosis.diagnosis_name}</td>
        <td className="px-4 py-2">
          {diagnosis.description || "No description"}
        </td>
        <td className="px-4 py-2">
          {diagnosis.symptoms || "No symptoms listed"}
        </td>
        <td className="px-4 py-2">
          {format(parseISO(diagnosis.date_diagnosed), "yyyy-MM-dd")}
        </td>
        <td className="px-4 py-2">{diagnosis.doctor?.name || "Unknown"}</td>
      </tr>
    ));
  };

  return (
    <div className="p-4 border mx-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Patient Diagnoses</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Diagnosis
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-sm text-nowrap border-b-2">
              <th className="px-4 py-2">Diagnosis Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Symptoms</th>
              <th className="px-4 py-2">Date Diagnosed</th>
              <th className="px-4 py-2">Doctor</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={"DiagnosisForm"}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Diagnosis</h2>
          <DiagnosisForm
            patientId={patient_id}
            onSuccess={handleDiagnosisAdded}
            onCancel={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PatientDiagnosisTable;
