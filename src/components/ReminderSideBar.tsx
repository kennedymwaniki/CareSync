import ReminderItem from "./ReminderItem";

interface ReminderData {
  time: string;
  title: string;
  medicines: { name: string; dosage: string; pills: number }[];
}

const ReminderSideBar = () => {
  // Dummy data
  const reminders: ReminderData[] = [
    {
      time: "In 3 hrs",
      title: "Take Medicine",
      medicines: [
        { name: "Amoxycillin", dosage: "500gm", pills: 2 },
        { name: "Paracetamol", dosage: "500gm", pills: 1 },
      ],
    },
    {
      time: "In 5 hrs",
      title: "Take Medicine",
      medicines: [
        { name: "Ibuprofen", dosage: "200mg", pills: 1 },
        { name: "Vitamin D", dosage: "500 IU", pills: 1 },
      ],
    },
    {
      time: "In 8 hrs",
      title: "Take Medicine",
      medicines: [
        { name: "Metformin", dosage: "500mg", pills: 1 },
        { name: "Aspirin", dosage: "75mg", pills: 1 },
      ],
    },
  ];

  return (
    <div className="w-96 p-5 bg-[#EDF3FF]">
      <h2 className="text-xl font-semibold mb-4">Today</h2>
      {reminders.map((reminder, index) => (
        <ReminderItem
          key={index}
          time={reminder.time}
          title={reminder.title}
          medicines={reminder.medicines}
        />
      ))}
    </div>
  );
};

export default ReminderSideBar;
