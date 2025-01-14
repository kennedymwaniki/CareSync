import { BsDropletHalf } from "react-icons/bs";
function NotificationItem() {
  return (
    <div className="flex items-center  justify-between p-[4px] border-gray-400 border rounded-lg">
      <div>
        <BsDropletHalf />
      </div>
      <div>
        <p className="text-sm font-bold">medication name</p>
        <p className="text-red-600 font-semibold">2 pills</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm fornt-semibod text-[#454BE7]">in an hour</p>
        <p className="text-black text-xs text-center font-semibold bg-[#2CAFFE] p-[2px] rounded-lg">
          pending
        </p>
      </div>
    </div>
  );
}

export default NotificationItem;
