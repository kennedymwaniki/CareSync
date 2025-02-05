import StatCards from "../../components/StatCards";
import TotalVitals from "../../components/TotalVitals";
import SideEffects from "../../components/SideEffects";
import CurrentMedication from "../../components/CurrentMedication";
import DoctorBanner from "./DoctoBanner";
import DoctorRightSideBar from "./DoctorRightSideBar";

const DoctorSummary = () => {
  const data = {
    name: "Patients",
    quantity: 30,
    color: "border-r-blue-700",
  };
  const data2 = {
    name: "Current Medication",
    quantity: 2,
    color: "border-r-green-600",
  };
  const data3 = {
    name: "Severe Medications",
    quantity: 3,
    color: "border-r-yellow-500",
  };
  const data4 = {
    name: "current side effects",
    quantity: 30,
    color: "border-r-red-700",
  };

  return (
    <div className="flex justify-between ">
      <div className="mx-auto p-2">
        <DoctorBanner />

        <p className="ml-2">This is the patient summary page</p>

        <div className="flex gap-3">
          <StatCards content={data} />
          <StatCards content={data2} />
          <StatCards content={data3} />
          <StatCards content={data4} />
        </div>

        <h4 className="ml-2 mt-4 font-semibold">My health OverView</h4>
        <TotalVitals />
        <div className="grid grid-cols-2 gap-4">
          <SideEffects />
          <CurrentMedication />
        </div>
      </div>

      <DoctorRightSideBar />
    </div>
  );
};

export default DoctorSummary;
