import api from "../../axios";
import { MedicationFormData } from "../components/MedicationForm";

interface MedicationPayload extends MedicationFormData {
  patient_id: number;
}

export const createMedication = async (medicationData: MedicationPayload) => {
  try {
    const medication = await api.post("/medications/create", medicationData);
    if (!medication.data) {
      throw new Error("No data received from server");
    }
    return medication.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create medication: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while creating medication");
  }
};
