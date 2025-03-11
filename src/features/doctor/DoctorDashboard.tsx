import { FileText } from "lucide-react";
import { FiServer } from "react-icons/fi";
import { FaUserNurse } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";
import { LuStickyNote } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";

const patientNavigation = [
  { name: "Doctor's Dashboard", icon: FiServer, path: "." },
  { name: "Patients", icon: SlPeople, path: "patients" },
  { name: "Shared Notes", icon: LuStickyNote, path: "shared-notes" },
  { name: "Care Providers", icon: FaUserNurse, path: "care-providers" },
  { name: "Reports & Analytics", icon: FileText, path: "doctor-reports" },
];

const DoctorDashboard = () => {
  return (
    <div className="flex flex-row w-full">
      <DoctorSideBar navigation={patientNavigation} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorDashboard;
