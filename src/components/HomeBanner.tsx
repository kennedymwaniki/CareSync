import { useSelector } from "react-redux";
import banner from "../assets/carepulse banner.png";
import { RootState } from "../app/store";
const HomeBanner = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  return (
    <div className="m-1 flex items-center justify-between rounded-lg border border-gray-200">
      <div className="w-3/5 ml-1">
        <h1 className="text-3xl font-bold mb-3">
          Hi <span className="text-[#454BE7]">{user?.name}</span>
        </h1>
        <p className="font-bold text-black">
          You have <span className="text-[#454BE7]">2 medications</span> to take
          today.Please <br />
          Keep an eye for notifications
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

export default HomeBanner;
