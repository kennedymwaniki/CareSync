import MiniDateComponent from "../../components/MiniDateComponent";
import NotificationItem from "../../components/NotificationItem";
import Timelines from "../../components/Timelines";

function CareProviderRightSideBar() {
  return (
    <div className="w-[287px] mt-2 p-[12px] rounded-lg border mx-auto border-gray-200 h-screen overflow-x-auto">
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

export default CareProviderRightSideBar;
