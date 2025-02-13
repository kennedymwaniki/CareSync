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
  const patientVitals = await api.get(`/health-vitals/${patientId}`);
  return patientVitals;
};

// get patient medication
export const getPatientMedication = async (patientId: number) => {
  const patientMedication = await api.get(`/medication-schedules/${patientId}`);
  return patientMedication;
};

// fetch patient care providers
export const getPatientCareProviders = async (patientId: number) => {
  const careProviders = await api.get(
    `/care-providers/fetch-patient-caregivers/${patientId}`
  );
  return careProviders;
};
