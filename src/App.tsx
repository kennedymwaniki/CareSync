import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
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

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/doctor",
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
    ],
  },
  {
    path: "/patient",
    element: <PatientDashboard />,
    children: [
      {
        index: true,
        element: <PatientSummary />,
      },
      {
        path: "medication",
        element: <Medication />,
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
