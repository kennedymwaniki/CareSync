import { FcNext } from "react-icons/fc";

const DateComponent = () => {
  return (
    <div className="flex justify-between mt-2">
      <div className="flex justify-between items-center space-x-2">
        <div className="space-x-1">
          <button className="bg-[#EDF3FF] p-2 rounded-lg">
            <FcNext />
          </button>
          <button className="bg-[#EDF3FF] p-2 rounded-lg">
            <FcNext />
          </button>
        </div>
        <p>15 March - 21 March </p>
      </div>

      <div className="flex justify-between items-center bg-[#EDF3FF] p-2 rounded-lg gap-2 text-[#454BE7]">
        <p>Week</p>
        <FcNext />
      </div>
    </div>
  );
};

export default DateComponent;
