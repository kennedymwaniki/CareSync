import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CareGiverResponse } from "../types/types";

interface AssignCareProviderRequest {
  patientId: number;
  providerId: number;
}

export const careProvidersApi = createApi({
  reducerPath: "careProvidersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "YOUR_BASE_URL" }), // Replace with your API base URL
  tagTypes: ["CareProviders"],
  endpoints: (builder) => ({
    getAllCareProviders: builder.query<CareGiverResponse, void>({
      query: () => "/care-providers/fetch-all",
      providesTags: ["CareProviders"],
    }),

    assignPatientDoctor: builder.mutation<void, AssignCareProviderRequest>({
      query: ({ patientId, providerId }) => ({
        url: `/care-providers/set-doctor,${patientId}${providerId}`,
        method: "POST",
      }),
      invalidatesTags: ["CareProviders"],
    }),

    assignPatientCareGiver: builder.mutation<void, AssignCareProviderRequest>({
      query: ({ patientId, providerId }) => ({
        url: `/care-providers/set-caregiver,${patientId}${providerId}`,
        method: "POST",
      }),
      invalidatesTags: ["CareProviders"],
    }),

    removePatientCareGiver: builder.mutation<void, AssignCareProviderRequest>({
      query: ({ patientId, providerId }) => ({
        url: `/care-providers/remove-caregiver,${patientId}${providerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CareProviders"],
    }),
  }),
});

export const {
  useGetAllCareProvidersQuery,
  useAssignPatientDoctorMutation,
  useAssignPatientCareGiverMutation,
  useRemovePatientCareGiverMutation,
} = careProvidersApi;
