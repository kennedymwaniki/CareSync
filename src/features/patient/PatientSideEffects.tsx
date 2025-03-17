import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { getPatientSideEffects } from "../../apis/PatientService";
import { useProfile } from "../../hooks/UseProfile";
import Loader from "../../components/Loader";
import Nodata from "../../assets/medication baner.png";
import { IoAddSharp } from "react-icons/io5";
import type { SideEffect, SideEffectApiResponse } from "../../types/types";
import Modal from "../../components/Modal";
import SideEffectsForm from "../../components/SideEffectsForm";
import { toast } from "sonner";

const PatientSideEffects = () => {
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { profile } = useProfile();
  const patientId = profile?.patient.id;

  useEffect(() => {
    const fetchSideEffects = async (patientId: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: SideEffectApiResponse = await getPatientSideEffects(
          patientId
        );
        if (!response.data || !response.data || response.data.length === 0) {
          toast.error("No data received from server!!");
        }
        setSideEffects(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch side effects"
        );
        toast.error("An error occured while fetching the side effects");
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchSideEffects(patientId);
    }
  }, [patientId]);

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-4">
            <Loader />
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-4">
            <p className="text-red-500">Error: {error}</p>
          </td>
        </tr>
      );
    }

    if (sideEffects.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-4">
            <img src={Nodata} alt="No Data" className="mx-auto w-80 h-80" />
            <p className="mt-4 text-gray-500">No side effects reported</p>
          </td>
        </tr>
      );
    }

    return sideEffects.map((effect) => (
      <tr key={effect.id} className="hover:bg-gray-50 text-sm text-nowrap">
        <td className="px-4 py-2 text-center">{effect.id}</td>
        <td className="px-4 py-2">{effect.medication.medication_name}</td>
        <td className="px-4 py-2">{effect.side_effect}</td>
        <td className="px-4 py-2">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              effect.severity === "Severe"
                ? "bg-red-100 text-red-800"
                : effect.severity === "Moderate"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {effect.severity}
          </span>
        </td>
        <td className="px-4 py-2">{`${effect.duration} days`}</td>
        <td className="px-4 py-2">
          {format(parseISO(effect.datetime), "yyyy-MM-dd HH:mm")}
        </td>
        <td className="px-4 py-2">{effect.notes || "No notes"}</td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-semibold">Side Effects</h1>
          <div>
            <button
              className="text-white p-2 rounded-md bg-[#454BE7] flex items-center"
              onClick={openModal}
            >
              <IoAddSharp className="text-white" />
              Report Side Effect
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-sm text-nowrap border-b-2">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Medication</th>
              <th className="px-4 py-2">Side Effect</th>
              <th className="px-4 py-2">Severity</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Date & Time</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Side Effect">
        <SideEffectsForm />
      </Modal>
    </div>
  );
};

export default PatientSideEffects;
