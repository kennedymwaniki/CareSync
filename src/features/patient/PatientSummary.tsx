import StatCards from "../../components/StatCards";

const PatientSummary = () => {
  const data = {
    name: "Total Medication",
    quantity: 30,
  };
  return (
    <div>
      <p>This is the patient summary page</p>
      <StatCards content={data} />
    </div>
  );
};

export default PatientSummary;
