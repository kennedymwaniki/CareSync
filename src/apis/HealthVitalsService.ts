// import { AxiosRequestConfig } from "axios";
import api from "../../axios";
import { Vitals } from "../types/types";

export const createPatientVitals = async (
  vitals: Vitals[],
  patientId: number
) => {
  try {
    const payload = {
      patient_id: patientId,
      vital_data: vitals,
    };
    const response = await api.post("/health-vitals", payload);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create patient vitals: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while creating patient vitals"
    );
  }
};

// update patient vitals by patient id
export const updatevitals = async (vitals: Vitals[], patientId: number) => {
  try {
    const payload = {
      patient_id: patientId,
      vital_data: vitals,
    };
    const response = await api.patch("/health-vitals/update", payload);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update patient vitals: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while updating patient vitals"
    );
  }
};
