import { useSelector } from "react-redux";
import banner from "../assets/carepulse banner.png";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { getTodaysMedication } from "../apis/PatientService";
import { useProfile } from "../hooks/UseProfile";

const HomeBanner = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [medicationCount, setMedicationCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { profile } = useProfile();
  const patient_id = profile?.patient?.id;

  useEffect(() => {
    const fetchMedicationCount = async () => {
      if (!patient_id) return;
      setLoading(true);

      try {
        const result = await getTodaysMedication(patient_id);
        if (!result.error && result.schedules?.medications) {
          setMedicationCount(result.schedules.medications.length);
        }
      } catch (error) {
        console.error("Error fetching medication count:", error);
        setError("Failed to fetch medication count");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicationCount();
  }, [patient_id]);

  return (
    <div className="m-1 flex items-center justify-between rounded-lg border border-gray-200">
      <div className="w-3/5 ml-1">
        <h1 className="text-3xl font-bold mb-3">
          Hi <span className="text-[#454BE7]">{user?.name}</span>
        </h1>
        <p className="font-bold text-black">
          {loading ? (
            <span>Loading your medications...</span>
          ) : error ? (
            <span>Unable to load your medications</span>
          ) : (
            <>
              You have{" "}
              <span className="text-[#454BE7]">
                {medicationCount} medication{medicationCount !== 1 ? "s" : ""}
              </span>{" "}
              to take today.
              <br />
              Please keep an eye for notifications
            </>
          )}
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
