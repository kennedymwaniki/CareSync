import NotificationItem from "../../components/NotificationItem";
import Timelines from "../../components/Timelines";

function DoctorRightSideBar() {
  return (
    <div className="w-80 mt-2 p-[12px] rounded-lg border border-gray-200 h-screen overflow-x-auto">
      <h1>Calender component to come......</h1>
      <div className="space-y-[5px]">
        <h1>Notifications</h1>
        <div>
          <p>Notification 1 content</p>
        </div>
        <div>
          <NotificationItem />
        </div>
        <div>
          <NotificationItem />
        </div>
        <div>
          <NotificationItem />
        </div>
        <Timelines />
      </div>
    </div>
  );
}

export default DoctorRightSideBar;
