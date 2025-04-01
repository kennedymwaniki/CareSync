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

// fetch doctor's patient

export const getDoctorPatients = async (doctorId: number) => {
  try {
    const doctorPatients = await api.post(
      "/care-providers/fetch-doctor-patient",
      { doctor_id: doctorId }
    );
    if (!doctorPatients.data) {
      throw new Error("No data received from server");
    }
    return doctorPatients.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch doctor patients: ${error.message}");
    }
    throw new Error(
      "An unexpected error occurred while fetching doctor patients"
    );
  }
};

// get adherence per patient
export const getAdherencePerPatient = async () => {
  try {
    const adherence = await api.post(
      "/reports/health-provider/adherence-per-patient"
    );
    if (!adherence.data) {
      throw new Error("No data received from server");
    }
    return adherence.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Failed to fetch adherence per patient: ${error.message}"
      );
    }
  }
};

// get Top adhering patients

export const getTopAdheringPatients = async () => {
  try {
    const adherence = await api.post(
      "/reports/health-provider/top-adhering-patients"
    );
    if (!adherence.data) {
      throw new Error("No data received from server");
    }
    return adherence.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Failed to fetch adherence per patient: ${error.message}"
      );
    }
  }
};

//  get patients Missed Medication
export const getMissedPatientsMedication = async () => {
  try {
    const missedMedication = await api.post(
      "/reports/health-provider/patient-missed-medications"
    );
    if (!missedMedication.data) {
      throw new Error("No data received from server");
    }
    return missedMedication;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Failed to fetch missedMedication per patient: ${error.message}"
      );
    }
  }
};

//  get patients Latest Side Effects
export const getLatestSideEffects = async () => {
  try {
    const response = await api.post(
      "/reports/health-provider/patient-latest-side-effects"
    );
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch latest side effects: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while fetching latest side effects"
    );
  }
};
