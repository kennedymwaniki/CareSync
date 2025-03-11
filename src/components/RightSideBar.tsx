import MiniDateComponent from "./MiniDateComponent";
import NotificationItem from "./NotificationItem";
import Timelines from "./Timelines";

function RightSideBar() {
  return (
    <div className="w-72 mt-2 p-[12px] rounded-lg border border-gray-200 h-screen overflow-x-auto">
      <MiniDateComponent />
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

export default RightSideBar;
