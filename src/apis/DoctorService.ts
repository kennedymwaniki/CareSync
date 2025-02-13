import api from "../../axios";

// get patient doctors
export const getPatientDoctors = async (patientId: number) => {
  const doctors = await api.get(`/patients/${patientId}/doctors`);
  return doctors;
};

// set patient
// prettier-ignore
export const assignPatientDoctor = async(patientId: number, doctorId: number) => {
    const response = await api.post(`/care-providers/set-doctor,${patientId}${doctorId}`);
    return response;
}

// prettier-ignore
export const assignPatientCareGiver = async(patientId: number, careGiverId: number) => {
    const response = await api.post(`/care-providers/set-caregiver,${patientId}${careGiverId}`);
    return response;
}

// remove patient caregiver
// prettier-ignore
export const removePatientCareGiver = async(patientId: number, careGiverId: number) => {
    const response = await api.delete(`/care-providers/remove-caregiver,${patientId}${careGiverId}`);
    return response;
}
