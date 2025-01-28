import user from "../../assets/UserProfile.webp";
const PatientProfile = () => {
  const dummyData = {
    name: "Jane Doe",
    email: "patient@gmail.com",
    dateOfBirth: "12th May, 1996",
    contact: "1-212-4545-78",
    address: "Nairobi, Kenya - SKU Room 56",
    sex: "Female",
    age: 23,
    occupation: "Business Owner",
    dateRegistered: "12th June, 2021",
    bloodGroup: "B-",
    emergencyContact: "455-125-789",
    relationship: "Mother",
    additionalInfo: "null",
    currentVitals: {
      bloodPressure: { value: "120/89 mmHg", status: "In the norm" },
      heartRate: { value: "120 BPM", status: "Above the norm" },
      glucose: { value: "97 mg/dl", status: "In the norm" },
      cholesterol: { value: "85 mg/dl", status: "In the norm" },
    },
    medicalHistory: [
      "Chronic Thyroid Disorder",
      "Diabetes Emergence",
      "Diabetic Ketoacidosis",
    ],
    timeline: [
      {
        date: "20 Jan 2023",
        diagnosis: "Malaria",
        severity: "High",
        totalVisits: 3,
        status: "Cured",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
      <div className="flex items-start gap-6 mb-6 border border-gray-400">
        {/* Profile Card */}
        <div className="bg-white  p-4 flex flex-col items-center w-1/3 border-r">
          <img src={user} alt="User" className="w-32 h-32 rounded-full mb-4" />
          <p className="text-lg font-semibold">{dummyData.email}</p>
          <p className="text-sm text-gray-600">{dummyData.dateOfBirth}</p>
          <p className="text-sm text-gray-600">{dummyData.contact}</p>
          <p className="text-sm text-gray-600 text-center">
            {dummyData.address}
          </p>
        </div>

        {/* Details Section */}
        <div className="flex-1 bg-white  p-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <span className="font-bold">Sex:</span> {dummyData.sex}
            </p>
            <p>
              <span className="font-bold">Occupation:</span>{" "}
              {dummyData.occupation}
            </p>
            <p>
              <span className="font-bold">Age:</span> {dummyData.age}
            </p>
            <p>
              <span className="font-bold">Date Registered:</span>{" "}
              {dummyData.dateRegistered}
            </p>
            <p>
              <span className="font-bold">Blood:</span> {dummyData.bloodGroup}
            </p>
            <p>
              <span className="font-bold">Emergency Contact:</span>{" "}
              {dummyData.emergencyContact}
            </p>
            <p>
              <span className="font-bold">Relationship:</span>{" "}
              {dummyData.relationship}
            </p>
            <p>
              <span className="font-bold">Something else:</span>{" "}
              {dummyData.additionalInfo}
            </p>
            <p>
              <span className="font-bold">Address:</span> {dummyData.address}
            </p>
          </div>
        </div>
      </div>

      {/* Current Vitals */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Vitals</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(dummyData.currentVitals).map(
            ([key, { value, status }]) => (
              <div key={key} className="bg-white border p-4 text-center">
                <p className="text-lg font-bold">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xl font-semibold">{value}</p>
                <p
                  className={`text-sm font-medium ${
                    status === "In the norm" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {status}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex justify-evenly space-x-2">
        {/* Medical History */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Medical History</h2>
          <ul className="list-none text-sm text-nowrap bg-white border-r p-4">
            {dummyData.medicalHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Time Line</h2>
          <table className="table-auto w-auto bg-white  overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Date of Visits</th>
                <th className="p-4 text-left">Diagnosis</th>
                <th className="p-4 text-left">Severity</th>
                <th className="p-4 text-left">Total Visits</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Report Download</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.timeline.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">{item.diagnosis}</td>
                  <td className="p-4">{item.severity}</td>
                  <td className="p-4">{item.totalVisits}</td>
                  <td className="p-4">{item.status}</td>
                  <td className="p-4 text-blue-500 cursor-pointer">
                    File Download
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
