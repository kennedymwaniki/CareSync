import StatCards from "../../components/StatCards";
import CareProviderBanner from "./CareeProviderBannner";
import CareGiverRightSideBar from "./CareGiverRightSideBar";
import MissedMedicationChart from "../doctor/MissedMedicationChart";
import LatestSideEffectsTable from "../doctor/LastSideEffectsTable";

const CareProviderSummary = () => {
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
    <div className="flex gap-2 p-1">
      <div className="flex-1">
        <CareProviderBanner />

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

      <CareGiverRightSideBar />
    </div>
  );
};

export default CareProviderSummary;
