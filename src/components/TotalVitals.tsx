import Vitals from "./Vitals";

function TotalVitals() {
  const data = {
    name: "Blood Pressure",
    quantity: 120,
    description: "in the norm",
  };
  const data2 = {
    name: "Heart Rate",
    quantity: 120,
    description: "Above norm",
  };
  const data3 = {
    name: "Temperature",
    quantity: 37,
    description: "in the norm",
  };
  const data4 = {
    name: "Oxygen Level",
    quantity: 98,
    description: "in the norm",
  };
  return (
    <div className="flex flex-col justify-between mt-4">
      <h4 className="ml-2 font-light">Current Vitals</h4>
      <div className="flex justify-between p-2">
        <Vitals content={data} />
        <Vitals content={data2} />
        <Vitals content={data3} />
        <Vitals content={data4} />
      </div>
    </div>
  );
}

export default TotalVitals;
