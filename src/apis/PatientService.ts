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
  const careProviders = await api.get(
    `/care-providers/fetch-patient-caregivers/${patientId}`
  );
  return careProviders;
};
