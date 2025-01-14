import HomeBanner from "../../components/HomeBanner";
import StatCards from "../../components/StatCards";
import TotalVitals from "../../components/TotalVitals";

const PatientSummary = () => {
  const data = {
    name: "Total Medication",
    quantity: 30,
    color: "border-r-blue-700",
  };
  const data2 = {
    name: "Diagnosis",
    quantity: 2,
    color: "border-r-green-600",
  };
  const data3 = {
    name: "Care Providers",
    quantity: 3,
    color: "border-r-yellow-500",
  };
  const data4 = {
    name: "severe Medication",
    quantity: 30,
    color: "border-r-red-700",
  };
  return (
    <div className="flex flex-col p-2">
      <HomeBanner />
      <p className="ml-2">This is the patient summary page</p>

      <div className="flex gap-3">
        <StatCards content={data} />
        <StatCards content={data2} />
        <StatCards content={data3} />
        <StatCards content={data4} />
      </div>

      <h4 className="ml-2 mt-4 font-semibold">My health OverView</h4>
      <TotalVitals />
    </div>
  );
};

export default PatientSummary;
