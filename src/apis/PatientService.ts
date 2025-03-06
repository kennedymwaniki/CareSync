import api from "../../axios";

// get patient doctors
export const getPatientDoctors = async (patientId: number) => {
  const doctors = await api.get(`/patients/${patientId}/doctors`);
  return doctors;
};

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
