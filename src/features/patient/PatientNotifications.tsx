import { NavLink } from "react-router-dom";
import NotificationItem from "../../components/NotificationItem";

const PatientNotifications = () => {
  return (
    <div className="flex flex-col p-4">
      <div>
        <h1 className="text-4xl font-bold mt-2">Notifications</h1>
        <p className="mt-4 text-gray-700">You have 2 notifications</p>
      </div>
      <div className="flex gap-8 p-4 space">
        <NavLink to="/" className="hover:underline hover:text-[#454BE7]">
          Medications
        </NavLink>
        <NavLink to="/" className="hover:underline hover:text-[#454BE7]">
          Medications
        </NavLink>
        <NavLink to="/" className="hover:underline hover:text-[#454BE7]">
          Medications
        </NavLink>
      </div>
      <div className="grid grid-cols-2">
        <div className="">
          <div className="space-y-4">
            <h4 className="font-bold text-2xl">Today</h4>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>
          <div className="space-y-4">
            <h4 className="mt-3 font-bold">Yesterday</h4>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientNotifications;
