import api from "../../axios";

// get diagnosis by id
// prettier-ignore
export const getDiagnosisById = async (diagnosisId: number) => {
  const diagnosis = await api.get(`/diagnosis/${diagnosisId}`);
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
