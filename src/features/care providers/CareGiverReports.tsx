import AdherencePerPatient from "../../components/AdherencePerPatient";
import TopAdherencePatients from "../../components/TopAdherencePatients";

const CareGiverReports = () => {
  return (
    <div className="mt-4">
      <div className="container flex justify between gap-4 ">
        <AdherencePerPatient />
        <TopAdherencePatients />
      </div>
    </div>
  );
};

export default CareGiverReports;
