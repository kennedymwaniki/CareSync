import banner from "../assets/carepulse banner.png";
const HomeBanner = () => {
  return (
    <div className="m-1 flex items-center justify-between p-2 rounded-lg  border border-gray-200">
      <div className="w-2/4">
        <h1 className="text-3xl font-bold">
          Hi <span className="text-[#454BE7]"> Yusuf Juma</span>
        </h1>
        <p className="font-bold text-black">
          You have <span className="text-[#454BE7]">2 medications</span> to take
          today.Please <br />
          Keep an eye for notifications
        </p>
      </div>
      <div className="">
        <img
          src={banner}
          alt="banner"
          height={200}
          className="object-cover mr-4 w-[150px]"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
