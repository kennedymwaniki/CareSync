import { IoAddSharp } from "react-icons/io5";

import MedicationsTable from "../../components/MedicationsTable";
const Medication = () => {
  return (
    <div className="p-3 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl">Medication</h2>
        </div>
        <div>
          <button className=" text-white p-2 rounded-md bg-[#454BE7] flex items-center">
            <IoAddSharp className="text-white" />
            Add medication
          </button>
        </div>
      </div>
      <div className="flex space-x-6 items-center w-64 mt-2">
        <button className="text-[#454BE7] hover:underline">Diagnosis</button>
        <button className="text-[#454BE7] text-nowrap">side effects</button>
        <button className="text-[#454BE7] hover:underline">Medications</button>
      </div>

      <div>
        <MedicationsTable />
      </div>
    </div>
  );
};

export default Medication;
