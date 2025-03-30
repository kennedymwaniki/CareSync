interface PatientVitalsProps {
  patient_id: number;
}

const PatientDiagnosisTable = ({ patient_id }: PatientVitalsProps) => {
  return (
    <div>
      <p>{patient_id}</p>
    </div>
  );
};

export default PatientDiagnosisTable;
