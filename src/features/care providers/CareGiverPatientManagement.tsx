import { useParams } from "react-router-dom";
import PatientVitals from "../doctor/PatientVitals";
import PatientDiagnosisTable from "../doctor/PatientDiagnosisTable";
import PatientSideEffectTable from "../doctor/PatientSideEffectTable";
import DoctorPatientMedication from "../doctor/DoctorPatientMedication";

const CareGiverPatientManagement = () => {
  const { patientId } = useParams();
  const patient_id = Number(patientId);

  return (
    <div className="container space-y-4">
      <PatientVitals patient_id={patient_id} />
      <PatientSideEffectTable patient_id={patient_id} />
      <PatientDiagnosisTable patient_id={patient_id} />
      <DoctorPatientMedication patient_id={patient_id} />
    </div>
  );
};

export default CareGiverPatientManagement;
