import api from "../../axios";

// get patient doctors
export const getPatientDoctors = async (patientId: string) => {
  const doctors = await api.get(`/patients/${patientId}/doctors`);
  return doctors;
};

// get all patient data
export const getPatientData = async (patientId: string) => {
  const patientData = await api.get(`/dashboard/patient-data/${patientId}`);
  return patientData;
};
