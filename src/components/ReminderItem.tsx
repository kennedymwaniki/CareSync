import React from "react";

interface Medicine {
  name: string;
  dosage: string;
  pills: number;
}

interface ReminderItemProps {
  time: string;
  title: string;
  medicines: Medicine[];
}

const ReminderItem: React.FC<ReminderItemProps> = ({
  time,
  title,
  medicines,
}) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-[#454BE7]">
      <p className="text-sm text-gray-500 mb-2">{time}</p>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div>
        {medicines.map((medicine, index) => (
          <div key={index} className="grid mb-2">
            <p>
              {medicine.name} - {medicine.dosage}
            </p>
            <p className="text-gray-500">{medicine.pills} pills</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderItem;
