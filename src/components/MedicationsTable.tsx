import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Nodata from "../assets/medication baner.png";
import { parseISO, isWithinInterval } from "date-fns";
import { addDays, format } from "date-fns";
import { ApiResponse, MedicationResponse } from "../types/types";
import { getPatientMedication } from "../apis/PatientService";
import { IoAddSharp } from "react-icons/io5";
import { toast } from "sonner";
import Loader from "../components/Loader";
import { useProfile } from "../hooks/UseProfile";
import Modal from "../components/Modal";
import MedicationForm from "./MedicationForm";
import CustomActivationForm from "./CustomActivationForm";
import SideEffectsForm from "./SideEffectsForm";

interface EnhancedMedication extends MedicationResponse {
  calculatedEndDate: string;
}

const MedicationsTable = () => {
  const [medications, setMedications] = useState<EnhancedMedication[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<"All" | "Today">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const [isSideEffectModalOpen, setIsSideEffectModalOpen] = useState(false);
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    number | null
  >(null);

  const { profile } = useProfile();
  const patientId = Number(profile?.patient.id);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openActivationModal = (medicationId: number) => {
    setSelectedMedicationId(medicationId);
    setIsActivationModalOpen(true);
  };

  const closeActivationModal = () => {
    setIsActivationModalOpen(false);
    setSelectedMedicationId(null);
  };

  const openSideEffectModal = (medicationId: number) => {
    setSelectedMedicationId(medicationId);
    setIsSideEffectModalOpen(true);
  };

  const closeSideEffectModal = () => {
    setIsSideEffectModalOpen(false);
    setSelectedMedicationId(null);
  };

  const handleSideEffectSuccess = () => {
    closeSideEffectModal();
    toast.success("Side effect reported successfully");
  };

  const handleStopNotifications = (medicationId: number) => {
    toast.success(`Notifications stopped for medication #${medicationId}`);
  };

  const handleActivationSuccess = () => {
    closeActivationModal();
    fetchMedications();
    toast.success("Medication activated successfully");
  };

  const calculateEndDate = (startDate: string, duration: string): string => {
    const durationMatch = duration.match(/(\d+)\s*days?/i);
    if (!durationMatch) return "";

    const days = parseInt(durationMatch[1]);
    const date = parseISO(startDate);
    return format(addDays(date, days), "yyyy-MM-dd");
  };

  const fetchMedications = async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse = await getPatientMedication(patientId);
      if (!response || !response.data || response.data.length === 0) {
        toast.error("No medications found!!");
        setMedications([]);
        return;
      }
      const enhancedMedications = response.data.map((med) => ({
        ...med,
        calculatedEndDate: calculateEndDate(med.prescribed_date, med.duration),
      }));
      setMedications(enhancedMedications);
      toast.success("Medications loaded successfully");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch patient medications"
      );
      toast.error("Failed to fetch patient medications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchMedications();
    }
  }, [patientId]);

  const handleMedicationAdded = () => {
    closeModal();
    fetchMedications();
  };

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

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={15} className="text-center py-4">
            <Loader />
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={10} className="text-center py-4">
            <p className="text-red-500">Error: {error}</p>
          </td>
        </tr>
      );
    }

    if (filteredMedications.length === 0) {
      return (
        <tr>
          <td colSpan={10} className="text-center py-4">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No medications available</p>
          </td>
        </tr>
      );
    }

    return filteredMedications.map((med) => (
      <tr key={med.id} className="hover:bg-gray-50 text-sm text-nowrap">
        <td className="px-4 py-2 text-center">{med.id}</td>
        <td className="px-4 py-2">{med.medication_name}</td>
        <td className="px-4 py-2">{`${med.dosage_strength}`}</td>
        <td className="px-4 py-2">{med.frequency}</td>
        <td className="px-4 py-2">
          {format(parseISO(med.prescribed_date), "yyyy-MM-dd")}
        </td>
        <td className="px-4 py-2">{med.calculatedEndDate}</td>
        <td className="px-4 py-2">{med.doctor?.name}</td>
        <td className="px-4 py-2">{`${med.route?.name} - ${med.form?.name}`}</td>
        <td className="px-4 py-2">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              med.active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {med.active ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="px-4 py-2">
          {!med.active ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              onClick={() => openActivationModal(med.id)}
            >
              Activate Medication
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                onClick={() => openSideEffectModal(med.id)}
              >
                Report Side Effect
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
                onClick={() => handleStopNotifications(med.id)}
              >
                Stop Notifications
              </button>
            </div>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-semibold">Medications</h1>
          <div>
            <button
              className="text-white p-2 rounded-md bg-[#454BE7] flex items-center"
              onClick={openModal}
            >
              <IoAddSharp className="text-white" />
              Add medication
            </button>
          </div>
        </div>
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
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add New Medication"
      >
        <MedicationForm
          patient_id={patientId}
          onSuccess={handleMedicationAdded}
        />
      </Modal>

      <Modal
        isOpen={isActivationModalOpen}
        onClose={closeActivationModal}
        title="Activate Medication"
      >
        {selectedMedicationId && (
          <CustomActivationForm
            medicationId={selectedMedicationId}
            onSuccess={handleActivationSuccess}
          />
        )}
      </Modal>

      <Modal
        isOpen={isSideEffectModalOpen}
        onClose={closeSideEffectModal}
        title="Report Side Effect"
      >
        {selectedMedicationId && (
          <SideEffectsForm
            medicationId={selectedMedicationId}
            onSuccess={handleSideEffectSuccess}
            onCancel={closeSideEffectModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default MedicationsTable;
