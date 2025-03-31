import AdherenceCircularChart from "../../components/AdherenceCircularChart";
import MedicationAdherenceByMedication from "../../components/MedicationAdherenceByMedication";

const PatientAnalytics = () => {
  return (
    <div>
      <AdherenceCircularChart />
      <MedicationAdherenceByMedication />
    </div>
  );
};

export default PatientAnalytics;
