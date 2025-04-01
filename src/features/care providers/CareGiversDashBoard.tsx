import { FileText } from "lucide-react";
import { FiServer } from "react-icons/fi";
import { Outlet } from "react-router-dom";
// import { LuStickyNote } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import CareProviderSideBar from "./CareProviderSideBar";

const patientNavigation = [
  { name: "Caregiver's Dashboard", icon: FiServer, path: "." },
  { name: "Patients", icon: SlPeople, path: "patients" },

  { name: "Reports & Analytics", icon: FileText, path: "caregiver-report" },
];

const CareGiversDashBoard = () => {
  return (
    <div className="flex flex-row w-full">
      <CareProviderSideBar navigation={patientNavigation} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default CareGiversDashBoard;
