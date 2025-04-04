import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./features/patient/PatientDashboard";
import PatientSummary from "./features/patient/PatientSummary";
import Medication from "./features/patient/Medication";
import PatientReminders from "./features/patient/PatientReminders";
// import CareProvidersList from "./features/care providers/CareProvidersList";
import PatientAnalytics from "./features/patient/PatientAnalytics";
import PatientProfile from "./features/patient/PatientProfile";
import CareProvidersTable from "./features/patient/CareProvidersTable";
import PatientNotifications from "./features/patient/PatientNotifications";
import DoctorDashboard from "./features/doctor/DoctorDashboard";
import DoctorSummary from "./features/doctor/DoctorSummary";
import DoctorNotes from "./features/doctor/DoctorNotes";

import CareProvidersSummary from "./features/care providers/CareProvidersSummary";
import CareGiversDashBoard from "./features/care providers/CareGiversDashBoard";
import CareGiverReports from "./features/care providers/CareGiverReports";

import PatientDiagnosis from "./features/patient/PatientDiagnosis";
import PatientSideEffects from "./features/patient/PatientSideEffects";
import MedicationsTable from "./components/MedicationsTable";
import DoctorReports from "./features/doctor/DoctorReports";
import DoctorRegistration from "./features/doctor/DoctorRegistration";
import CareProviderLogin from "./features/care providers/CareProviderLogin";
import MedicationManagement from "./features/care providers/MedicationManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import CareProviderRegistration from "./features/care providers/CareProviderRegistration";
import Unauthorized from "./pages/Unauthorized";
import DoctorProfile from "./features/doctor/DoctorProfile";
import DoctorPatients from "./features/doctor/DoctorPatients";
import DoctorPatientManagement from "./features/doctor/DoctorPatientManagement";
import CareGiverPatients from "./features/care providers/CareGiverPatients";
import CareGiverPatientManagement from "./features/care providers/CareGiverPatientManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/caregiver-register",
    element: <CareProviderRegistration />,
  },
  {
    path: "/doctor-register",
    element: <DoctorRegistration />,
  },
  {
    path: "/caregiver-login",
    element: <CareProviderLogin />,
  },

  // doctor routes
  {
    path: "/doctor",
    element: <ProtectedRoute requiredRole="Doctor" />,
    children: [
      {
        path: "",
        element: <DoctorDashboard />,
        children: [
          {
            index: true,
            element: <DoctorSummary />,
          },
          {
            path: "shared-notes",
            element: <DoctorNotes />,
          },
          {
            path: "patients",
            element: <DoctorPatients />,
          },
          {
            path: "patients/:patientId",
            element: <DoctorPatientManagement />,
          },
          {
            path: "care-providers",
            element: <CareProvidersTable />,
          },
          {
            path: "doctor-reports",
            element: <DoctorReports />,
          },
          {
            path: "doctor-profile",
            element: <DoctorProfile />,
          },
        ],
      },
    ],
  },
  // care provider routes
  {
    path: "/careProvider",
    element: <ProtectedRoute requiredRole="Caregiver" />,
    children: [
      {
        path: "",
        element: <CareGiversDashBoard />,
        children: [
          {
            index: true,
            element: <CareProvidersSummary />,
          },
          {
            path: "shared-notes",
            element: <DoctorNotes />,
          },
          {
            path: "patients",
            element: <CareGiverPatients />,
          },
          {
            path: "patients/:patientId",
            element: <CareGiverPatientManagement />,
          },

          {
            path: "care-providers",
            element: <CareProvidersTable />,
          },
          {
            path: "caregiver-report",
            element: <CareGiverReports />,
          },
          {
            path: "medication-management",
            element: <MedicationManagement />,
          },
        ],
      },
    ],
  },
  // patient routes
  {
    path: "/patient",
    element: <ProtectedRoute requiredRole="Patient" />,
    children: [
      {
        path: "",
        element: <PatientDashboard />,
        children: [
          {
            index: true,
            element: <PatientSummary />,
          },
          {
            path: "medication",
            element: <Medication />,
            children: [
              {
                index: true,
                element: <MedicationsTable />,
              },
              {
                path: "diagnosis",
                element: <PatientDiagnosis />,
              },
              {
                path: "side-effects",
                element: <PatientSideEffects />,
              },
            ],
          },
          {
            path: "patient-reminder",
            element: <PatientReminders />,
          },
          {
            path: "care-providers",
            element: <CareProvidersTable />,
          },
          {
            path: "patient-report",
            element: <PatientAnalytics />,
          },
          {
            path: "patient-profile",
            element: <PatientProfile />,
          },
          {
            path: "patient-notifications",
            element: <PatientNotifications />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
