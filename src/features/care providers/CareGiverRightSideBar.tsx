import MiniDateComponent from "../../components/MiniDateComponent";

function CareProviderRightSideBar() {
  return (
    <div className="w-[256px] mt-2 p-[12px] rounded-lg border border-gray-200 h-screen overflow-x-auto">
      <MiniDateComponent />
      <div className="space-y-[5px]">
        <h1>Notifications</h1>
      </div>
    </div>
  );
}

export default CareProviderRightSideBar;
