// import { AxiosRequestConfig } from "axios";
import api from "../../axios";
import { HealthVital } from "../types/types";

// prettier-ignore
export const createPatientVitals = async (vitals: HealthVital, patientId:string) => {
  const response = await api.post(`/health-vitals"/create/${patientId}`, vitals);
  return response;
};

export const updatevitals = async (vitals: HealthVital, patientId: number) => {
  const response = await api.put(`/health-vitals/${patientId}}`, vitals);
  return response;
};
