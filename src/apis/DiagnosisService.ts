import api from "../../axios";

// get diagnosis by id
// prettier-ignore
export const getDiagnosisById = async (patientId: number) => {
  const diagnosis = await api.get(`/diagnosis/patient/${patientId}`);
  return diagnosis;
};

// get patient diagnosis
// prettier-ignore
export const getPatientDiagnosis = async (patientId: number) => {
  const diagnosis = await api.get(`/diagnosis/patient/${patientId}`);
  return diagnosis;
};

// get diagosis by the doctor who created it
// prettier-ignore
export const getDoctorDiagnosis = async (doctorId: number) => {
  const diagnosis = await api.get(`/diagnosis/doctor/${doctorId}`);
  return diagnosis;
};

// create diagnosis
export const createDiagnosis = async (payload: {
  patient_id: number;
  diagnosis_name: string;
  description: string;
  symptoms: string;
  date_diagnosed: string;
}) => {
  try {
    const diagnosis = await api.post("/diagnosis/create", payload);
    if (!diagnosis.data) {
      throw new Error("Failed to create diagnosis");
    }
    return diagnosis.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while creating the diagnosis");
  }
};
