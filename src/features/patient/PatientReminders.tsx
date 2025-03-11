import ReminderSideBar from "../../components/ReminderSideBar";
import reminder from "../../assets/reminderbanner.png";
import DateComponent from "../../components/DateComponent";
const PatientReminders = () => {
  return (
    <div className="flex w-full text-nowrap">
      <div className="p-2">
        <h4 className="mb-2">Reminder</h4>
        <div className="p-2 bg-[#EDF3FF] rounded-md flex justify-between">
          <div className="my-6">
            <p className="font-bold">Your Health Deserves the Best</p>
            <p>A promise to yourself to live your life to the fullest</p>
          </div>
          <div className="w-auto flex items-center justify-between">
            <img
              src={reminder}
              alt="banner"
              className="object-cover w-[280px] h-[150px]"
            />
          </div>
        </div>
        <div>
          <DateComponent />
        </div>
      </div>
      <div>
        <ReminderSideBar />
      </div>
    </div>
  );
};

export default PatientReminders;
