import { useState, useEffect } from "react";
import { Vital, VitalsResponse, Vitals } from "../../types/types";

import Modal from "../../components/Modal"; // Assuming you have a Modal component
import VitalsForm from "../../components/VitalsForm";
import { getPatientVitals } from "../../apis/PatientService";
import {
  createPatientVitals,
  updatevitals,
} from "../../apis/HealthVitalsService";

interface PatientVitalsProps {
  patient_id: number;
}

const PatientVitals = ({ patient_id }: PatientVitalsProps) => {
  const [vitalsData, setVitalsData] = useState<Vital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<"create" | "update">("create");

  const fetchPatientVitals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: VitalsResponse = await getPatientVitals(patient_id);
      if (!response.vitals) {
        throw new Error("No vitals data received from server");
      }
      setVitalsData(response.vitals);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch patient vitals"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patient_id) {
      fetchPatientVitals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient_id]);

  const handleCreateVitals = async (data: {
    patient_id: number;
    vital_data: { name: string; value: string }[];
  }) => {
    try {
      await createPatientVitals(data.vital_data as Vitals[], data.patient_id);
      setShowModal(false);
      fetchPatientVitals(); // Refresh vitals after creation
    } catch (error) {
      console.error("Error creating vitals:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create patient vitals"
      );
    }
  };

  const handleUpdateVitals = async (data: {
    patient_id: number;
    vital_data: { name: string; value: string }[];
  }) => {
    try {
      await updatevitals(data.vital_data as Vitals[], data.patient_id);
      setShowModal(false);
      fetchPatientVitals(); // Refresh vitals after update
    } catch (error) {
      console.error("Error updating vitals:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update patient vitals"
      );
    }
  };

  const openCreateModal = () => {
    setModalAction("create");
    setShowModal(true);
  };

  const openUpdateModal = () => {
    setModalAction("update");
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 border rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-between mt-4 bg-white p-4 rounded-lg shadow mx-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-lg">Patient Vitals</h4>
        {vitalsData.length > 0 ? (
          <button
            onClick={openUpdateModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Vitals
          </button>
        ) : (
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Vitals
          </button>
        )}
      </div>

      {vitalsData.length > 0 ? (
        <div className="flex flex-wrap justify-between p-2">
          {vitalsData.map((vital, index) => (
            <div
              key={index}
              className="border-gray-600 p-3 border rounded-md m-1 w-[150px] h-[100px]"
            >
              <p>{vital.name}</p>
              <p className="font-bold text-lg">
                {vital.value} {vital.unit}
              </p>
              <p
                className={`text-sm ${
                  vital.isNormal ? "text-green-500" : "text-red-500"
                }`}
              >
                {vital.isNormal ? "in the norm" : "out of norm"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No vitals data available
        </div>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`${modalAction === "create" ? "Create" : "Update"} Vitals`}
        >
          <VitalsForm
            patientId={patient_id}
            initialVitals={vitalsData}
            onSubmit={
              modalAction === "create" ? handleCreateVitals : handleUpdateVitals
            }
            action={modalAction}
          />
        </Modal>
      )}
    </div>
  );
};

export default PatientVitals;
