import { LuFilter } from "react-icons/lu";
import { GoX } from "react-icons/go";
function filterbuttons() {
  return (
    <div>
      <div className="filter buttons">
        <div className="flex space-x-6 items-center w-64 mt-2">
          <p className="text-[#454BE7] bg-[#EDF3FF] p-[4px] rounded-md flex items-center gap-3">
            Active
            <GoX />
          </p>
          <p className="text-[#454BE7] bg-[#EDF3FF] p-[4px] rounded-md flex items-center gap-3">
            Today
            <GoX />
          </p>
          <p className="bg-[#EDF3FF] p-[4px] rounded-md flex items-center gap-3 pl-1 pr-1">
            <LuFilter />
            Filters
          </p>
        </div>
      </div>
    </div>
  );
}

export default filterbuttons;
