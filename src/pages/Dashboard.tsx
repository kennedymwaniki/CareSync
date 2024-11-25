import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Users, Calendar, FileText } from "lucide-react";
const patientNavigation = [
  { name: "Profile", icon: Users, path: "/patient/profile" },
  { name: "Appointments", icon: Calendar, path: "/patient/appointments" },
  { name: "Documents", icon: FileText, path: "/patient/documents" },
];
const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Sidebar navigation={patientNavigation} />
      <div className="flex">
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
