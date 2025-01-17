import Sidebar from "../../components/Sidebar";
import { Calendar, FileText } from "lucide-react";
import { FiServer } from "react-icons/fi";
import { GiMedicines } from "react-icons/gi";
import { FaUserNurse } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const patientNavigation = [
  { name: "Patient Dashboard", icon: FiServer, path: "." },
  { name: "Medication", icon: GiMedicines, path: "medication" },
  { name: "Reminder", icon: Calendar, path: "patient-reminder" },
  { name: "Care Providers", icon: FaUserNurse, path: "care-providers" },
  { name: "Reports & Analytics", icon: FileText, path: "patient-report" },
];

const PatientDashboard = () => {
  return (
    <div className="flex">
      <Sidebar navigation={patientNavigation} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientDashboard;
