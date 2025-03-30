import { useParams } from "react-router-dom";
import PatientVitals from "./PatientVitals";
import PatientDiagnosisTable from "./PatientDiagnosisTable";
import PatientSideEffectTable from "./PatientSideEffectTable";

const DoctorPatientManagement = () => {
  const { patientId } = useParams();

  const patient_id = Number(patientId);

  return (
    <div>
      <PatientVitals patient_id={patient_id} />
      <PatientSideEffectTable patient_id={patient_id} />
      <PatientDiagnosisTable patient_id={patient_id} />
    </div>
  );
};

export default DoctorPatientManagement;
