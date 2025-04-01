import api from "../../axios";
import { MedicationFormData } from "../components/MedicationForm";

interface MedicationPayload extends MedicationFormData {
  patient_id: number;
}

// Define a proper interface for the medication activation payload
export interface MedicationActivationPayload {
  medication_id: number;
  schedules: string[];
  start_datetime: string;
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

export const activateMedication = async (data: MedicationActivationPayload) => {
  try {
    const response = await api.post("/medications/schedule/custom", data);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to activate medication: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while activating medication");
  }
};

// mark as taken

export const markMedicationAsTaken = async (medication_schedule_id: number) => {
  try {
    const response = await api.post("medications/schedule/take", {
      medication_schedule_id: medication_schedule_id,
    });
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to mark medication as taken: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while marking medication as taken"
    );
  }
};



