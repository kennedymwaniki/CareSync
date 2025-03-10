import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const MissedMedicationChart = () => {
  const data = [
    { name: "Mr Cooper", missed: 2 },
    { name: "Lesley", missed: 5 },
    { name: "Golden", missed: 2 },
    { name: "Jane", missed: 8 },
    { name: "Martha", missed: 0 },
    { name: "Limo", missed: 4 },
  ];

  return (
    <div className="w-full h-80 rounded-md shadow-md">
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="missed" fill="#7c46d4c4" />
      </BarChart>
    </div>
  );
};

export default MissedMedicationChart;
