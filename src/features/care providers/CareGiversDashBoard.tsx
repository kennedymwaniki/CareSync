import { FileText } from "lucide-react";
import { FiServer } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { LuStickyNote } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import CareProviderSideBar from "./CareProviderSideBar";

const patientNavigation = [
  { name: "Caregiver's Dashboard", icon: FiServer, path: "." },
  { name: "Patients", icon: SlPeople, path: "patients" },
  {
    name: "Medication Management",
    icon: LuStickyNote,
    path: "medication-management",
  },
  { name: "Reports & Analytics", icon: FileText, path: "caregiver-report" },
];

const CareGiversDashBoard = () => {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto">
      <CareProviderSideBar navigation={patientNavigation} />
      <main className="flex-1 min-w-0 px-2">
        <Outlet />
      </main>
    </div>
  );
};

export default CareGiversDashBoard;
