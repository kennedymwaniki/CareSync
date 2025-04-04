import HomeBanner from "../../components/HomeBanner";
import StatCards from "../../components/StatCards";
import TotalVitals from "../../components/TotalVitals";
import RightSideBar from "../../components/RightSideBar";
// import CurrentMedication from "../../components/CurrentMedication";
import { getPatientDiagnosis } from "../../apis/DiagnosisService";
import {
  getPatientCareProviders,
  getPatientMedication,
} from "../../apis/PatientService";
import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/UseProfile";
import PatientSideEffectItem from "./PatientSideffectItem";

interface Medication {
  id: number;
}

interface Diagnosis {
  id: number;
}

interface CareGivers {
  id: number;
}

const PatientSummary = () => {
  const [medication, setMedication] = useState<Medication[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [careGivers, setCareGivers] = useState<CareGivers[]>([]);

  const { profile } = useProfile();
  console.log(profile); // Use the custom hook

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.patient?.id) return;

      try {
        const [medicationResponse, diagnosisResponse, careproviders] =
          await Promise.all([
            getPatientMedication(profile.patient.id),
            getPatientDiagnosis(profile.patient.id),
            getPatientCareProviders(profile.patient.id),
          ]);

        // Assuming the responses contain a data property with the array
        setMedication(medicationResponse.data || []);
        setDiagnosis(diagnosisResponse.data || []);
        setCareGivers(careproviders.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [profile]);

  const data = {
    name: "Total Medication",
    quantity: medication.length ?? 0,
    color: "border-r-blue-700",
  };
  const data2 = {
    name: "Diagnosis",
    quantity: diagnosis.length ?? 0,
    color: "border-r-green-600",
  };
  const data3 = {
    name: "Care Providers",
    quantity: careGivers.length ?? 0,
    color: "border-r-yellow-500",
  };
  // const data4 = {
  //   name: "severe Medication",
  //   quantity: 30,
  //   color: "border-r-red-700",
  // };

  return (
    <div className="flex justify-evenly w-full">
      <div className="">
        <HomeBanner />

        <p className="ml-2">This is the patient summary page</p>

        <div className="flex gap-3">
          <StatCards content={data} />
          <StatCards content={data2} />
          <StatCards content={data3} />
          {/* <StatCards content={data4} /> */}
        </div>

        <h4 className="ml-2 mt-2 font-semibold">My health OverView</h4>
        <TotalVitals />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <PatientSideEffectItem />
          {/* <CurrentMedication /> */}
        </div>
      </div>

      <RightSideBar />
    </div>
  );
};

export default PatientSummary;
