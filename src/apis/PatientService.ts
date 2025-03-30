import api from "../../axios";
import { toast } from "sonner";

// get all patient data
export const getPatientData = async (patientId: number) => {
  const patientData = await api.get(`/dashboard/patient-dat/${patientId}`);
  return patientData;
};

// get patient vitals
export const getPatientVitals = async (patientId: number) => {
  try {
    const patientVitals = await api.get(`/health-vitals/${patientId}`);
    if (!patientVitals.data) {
      throw new Error("No data received from server");
    }
    return patientVitals.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch patient vitals: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while fetching patient vitals"
    );
  }
};

// get patient medication
export const getPatientMedication = async (patient_id: number) => {
  try {
    const payload = { patient_id: patient_id };
    console.log("Request payload:", payload);
    const Medication = await api.post("/medications/fetch/by-patient", payload);
    if (!Medication.data) {
      toast.error("No data received from server");
      throw new Error("No data received from server");
    }
    return Medication.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch patient medication: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while fetching patient medication"
    );
  }
};

// fetch patient care providers
export const getPatientCareProviders = async (patientId: number) => {
  try {
    const careProviders = await api.get(
      `/care-providers/fetch-patient-caregivers/${patientId}`
    );
    if (!careProviders) {
      throw new Error("no data found on the server");
    }
    return careProviders.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Diagnosis: ${error.message}`);
    }
    throw new Error("An error occured while fetching the careProviders");
  }
};

// fetch patient care providers
export const getPatientDoctors = async (patientId: number) => {
  try {
    const careProviders = await api.get(
      `/care-providers/fetch-patient-doctors/${patientId}`
    );
    if (!careProviders) {
      throw new Error("no data found on the server");
    }
    return careProviders.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Diagnosis: ${error.message}`);
    }
    throw new Error("An error occured while fetching the careProviders");
  }
};

// get patient diagnosis
export const getPatientDiagnosis = async (patientId: number) => {
  try {
    const response = await api.get(`/diagnosis/patient/${patientId}`);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch patient diagnosis: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while fetching patient diagnosis"
    );
  }
};

// get patient sideeffects
export const getPatientSideEffects = async (patient_id: number) => {
  try {
    const payload = { patient_id: patient_id };
    const sideEffects = await api.post("/side-effects/fetch", payload);
    if (!sideEffects.data) {
      throw new Error("no data received from the server");
    }
    return sideEffects.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fecth side effects `);
    }
    throw new Error(
      "An unexpected error occured while fetching your sideeffects"
    );
  }
};

// set patient doctor
export const setPatientDoctor = async (doctorId: number, patientId: number) => {
  try {
    const payload = {
      doctor_id: doctorId,
      patient_id: patientId,
      isMain: false,
    };
    console.log(payload);
    const doctor = await api.post("/care-providers/set-doctor", payload);
    if (!doctor.data) {
      throw new Error("no data received from the server");
    }
    return doctor.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to complete opration `);
    }
    throw new Error(
      "An unexpected error occured while designating your selected doctor"
    );
  }
};
// remove patient doctor
export const removePatientDoctor = async (
  doctorId: number,
  patientId: number
) => {
  try {
    const payload = {
      doctor_id: doctorId,
      patient_id: patientId,
    };
    const doctor = await api.post("/care-providers/remove-doctor", payload);
    if (!doctor.data) {
      throw new Error("no data received from the server");
    }
    return doctor.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to complete doctor removal `);
    }
    throw new Error(
      "An unexpected error occured while removing your selected doctor"
    );
  }
};

// set patient caregiver
export const setPatientCareGiver = async (
  caregiverId: number,
  patientId: number
) => {
  try {
    const payload = {
      caregiver_id: caregiverId,
      patient_id: patientId,
      relation: "Parent",
    };

    const response = await api.post("/care-providers/set-caregiver", payload);
    if (!response.data) {
      throw new Error("no data received from the server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to complete designating your caregiver: ${error.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred setting your preferred caregiver"
    );
  }
};

// remove patient caregiver
export const removePatientCareGiver = async (
  caregiverId: number,
  patientId: number
) => {
  try {
    const payload = {
      caregiver_id: caregiverId, // Changed from caregiverId
      patient_id: patientId, // Changed from patientId
    };

    const response = await api.post(
      "/care-providers/remove-caregiver",
      payload
    );
    if (!response.data) {
      throw new Error("no data received from the server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to remove caregiver: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while removing your caregiver"
    );
  }
};

//  get patient medication using patient id
export const getPatientMedicationById = async (patientId: number) => {
  try {
    const payload = { patient_id: patientId };
    const response = await api.post("/medications/fetch/by-patient", payload);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch patient medication: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while fetching patient medication"
    );
  }
};

// get patient vitals by patient id
export const getPatientVitalsById = async (patientId: number) => {
  try {
    const response = await api.get(`/health-vitals/${patientId}`);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch patient vitals: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while fetching patient vitals"
    );
  }
};
