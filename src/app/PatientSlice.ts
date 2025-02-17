// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { PatientDataResponse, HealthVital } from "../types/types";

// interface PatientVitalsRequest {
//   patientId: number;
//   vitals: HealthVital;
// }

// interface PatientMedicationRequest {
//   patientId: number;
// }

// export const patientApi = createApi({
//   reducerPath: "patientApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "YOUR_BASE_URL" }), // Replace with your API base URL
//   tagTypes: [
//     "Patient",
//     "PatientVitals",
//     "PatientMedication",
//     "PatientCareProviders",
//   ],
//   endpoints: (builder) => ({
//     // Get patient dashboard data
//     getPatientData: builder.query<PatientDataResponse, number>({
//       query: (patientId) => `/dashboard/patient-data/${patientId}`,
//       providesTags: ["Patient"],
//     }),

//     // Get patient vitals
//     getPatientVitals: builder.query<HealthVital[], number>({
//       query: (patientId) => `/health-vitals/${patientId}`,
//       providesTags: ["PatientVitals"],
//     }),

//     // Create patient vitals
//     createPatientVitals: builder.mutation<void, PatientVitalsRequest>({
//       query: ({ patientId, vitals }) => ({
//         url: `/health-vitals/create/${patientId}`,
//         method: "POST",
//         body: vitals,
//       }),
//       invalidatesTags: ["PatientVitals"],
//     }),

//     // Update patient vitals
//     updatePatientVitals: builder.mutation<void, PatientVitalsRequest>({
//       query: ({ patientId, vitals }) => ({
//         url: `/health-vitals/${patientId}`,
//         method: "PUT",
//         body: vitals,
//       }),
//       invalidatesTags: ["PatientVitals"],
//     }),

//     // Get patient medication
//     getPatientMedication: builder.query<any, PatientMedicationRequest>({
//       query: ({ patientId }) => `/medication-schedules/${patientId}`,
//       providesTags: ["PatientMedication"],
//     }),

//     // Get patient doctors
//     getPatientDoctors: builder.query<any, number>({
//       query: (patientId) => `/patients/${patientId}/doctors`,
//       providesTags: ["PatientCareProviders"],
//     }),

//     // Get patient care providers
//     getPatientCareProviders: builder.query<any, number>({
//       query: (patientId) =>
//         `/care-providers/fetch-patient-caregivers/${patientId}`,
//       providesTags: ["PatientCareProviders"],
//     }),
//   }),
// });

// export const {
//   useGetPatientDataQuery,
//   useGetPatientVitalsQuery,
//   useCreatePatientVitalsMutation,
//   useUpdatePatientVitalsMutation,
//   useGetPatientMedicationQuery,
//   useGetPatientDoctorsQuery,
//   useGetPatientCareProvidersQuery,
// } = patientApi;
