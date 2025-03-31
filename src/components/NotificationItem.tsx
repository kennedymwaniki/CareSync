import { BsDropletHalf } from "react-icons/bs";
import { formatDistanceToNow, parseISO } from "date-fns";

interface NotificationItemProps {
  medicationName: string;
  dosageStrength: string;
  doseTime: string;
  status: "Pending" | "Taken" | "Missed";
}

function NotificationItem({
  medicationName,
  dosageStrength,
  doseTime,
  status,
}: NotificationItemProps) {
  const timeUntilDose = formatDistanceToNow(parseISO(doseTime), {
    addSuffix: true,
  });

  return (
    <div className="flex items-center justify-between p-[4px] border-gray-400 border rounded-lg">
      <div>
        <BsDropletHalf className="text-[#454BE7]" />
      </div>
      <div>
        <p className="text-sm font-bold">{medicationName}</p>
        <p className="text-red-600 font-semibold">{dosageStrength}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[#454BE7]">{timeUntilDose}</p>
        <p
          className={`text-black text-xs text-center font-semibold p-[2px] rounded-lg ${
            status === "Pending"
              ? "bg-[#2CAFFE]"
              : status === "Taken"
              ? "bg-green-400"
              : "bg-red-400"
          }`}
        >
          {status.toLowerCase()}
        </p>
      </div>
    </div>
  );
}

export default NotificationItem;
