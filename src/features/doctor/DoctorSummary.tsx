import StatCards from "../../components/StatCards";
import DoctorBanner from "./DoctoBanner";
import DoctorRightSideBar from "./DoctorRightSideBar";
import MissedMedicationChart from "./MissedMedicationChart";
import LatestSideEffectsTable from "./LastSideEffectsTable";

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
    <div className="flex justify-between gap-6">
      <div className="flex-1 min-w-0">
        <DoctorBanner />

        <p className="ml-2">This is the patient summary page</p>

        <div className="flex gap-3">
          <StatCards content={data} />
          <StatCards content={data2} />
          <StatCards content={data3} />
          <StatCards content={data4} />
        </div>

        <div className="grid space-y-4 mt-3">
          <MissedMedicationChart />
          <LatestSideEffectsTable />
        </div>
      </div>

      <DoctorRightSideBar />
    </div>
  );
};

export default DoctorSummary;
