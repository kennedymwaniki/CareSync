import NotificationItem from "./NotificationItem";

function RightSideBar() {
  return (
    <div className="w-80 m-1 p-[20px] rounded-lg border border-gray-200 h-screen ">
      <h1>This is te right hand sidebar</h1>
      <div className="space-y-2">
        <h1>Notifications</h1>
        <div>
          <h1>Notification 1</h1>
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
      </div>
    </div>
  );
}

export default RightSideBar;
