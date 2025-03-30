import { useParams } from "react-router-dom";
import PatientVitals from "./PatientVitals";

const DoctorPatientManagement = () => {
  const { patientId } = useParams();

  const patient_id = Number(patientId);

  return (
    <div>
      <PatientVitals patient_id={patient_id} />
    </div>
  );
};

export default DoctorPatientManagement;
