import MiniDateComponent from "../../components/MiniDateComponent";

function DoctorRightSideBar() {
  return (
    <div className="w-72 mt-2 p-[12px] rounded-lg border mx-auto border-gray-200 h-screen overflow-x-auto">
      <MiniDateComponent />
      <div className="space-y-[5px]">
        <h1>Notifications</h1>
      </div>
    </div>
  );
}

export default DoctorRightSideBar;
