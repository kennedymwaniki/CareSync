import banner from "../../assets/carepulse banner.png";
const DoctorBanner = () => {
  return (
    <div className="m-1 flex items-center justify-between rounded-lg border border-gray-200">
      <div className="w-3/5 ml-1">
        <h1 className="text-3xl font-bold mb-3">
          Hi <span className="text-[#454BE7]">John Mukeria</span>
        </h1>
        <p className="font-bold text-black">
          Always Checkout on your patients. Help them <br />
          Improve their daily health
        </p>
      </div>
      <div className="w-auto flex items-center justify-end">
        <img
          src={banner}
          alt="banner"
          className="object-cover w-[300px] h-[190px] aspect-square"
        />
      </div>
    </div>
  );
};

export default DoctorBanner;
