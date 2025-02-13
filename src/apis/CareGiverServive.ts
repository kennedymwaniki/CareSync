import api from "../../axios";
import { CareGiverResponse } from "../types/types";

export const getAllCareGivers = async (): Promise<CareGiverResponse> => {
  const response = await api.get<CareGiverResponse>("/care-givers/fetch-all");
  return response.data;
};
