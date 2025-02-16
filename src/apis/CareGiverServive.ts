import api from "../../axios";
import { CareGiverResponse } from "../types/types";

// export const getAllCareGivers = async (): Promise<CareGiverResponse> => {
//   const response = await api.get<CareGiverResponse>("/care-givers/fetch-all");
//   return response.data;
// };

export const getAllCareGivers = async (): Promise<CareGiverResponse> => {
  try {
    const response = await api.get<CareGiverResponse>("/care-providers/fetch-all");

    if (!response.data) {
      throw new Error("No data received from server");
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch care givers: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching care givers");
  }
};
