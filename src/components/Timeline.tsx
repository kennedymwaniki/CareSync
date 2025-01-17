import { FcNext } from "react-icons/fc";
function Timeline() {
  return (
    <div className="flex rounded-md border border-gray-200 p-2 justify-between font-semibold">
      <div className="grid text-xs">
        <h3>Doctor Alert</h3>
        <p className="text-xs">Dr John scheduled a new apointment</p>
        <p className="text-[#FE6A35] font-bold">18 March 2025</p>
      </div>
      <button>
        <FcNext />
      </button>
    </div>
  );
}

export default Timeline;
