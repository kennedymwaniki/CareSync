import { useState, useEffect } from "react";
import { Vital } from "../types/types";

interface VitalsFormProps {
  patientId: number;
  initialVitals: Vital[];
  onSubmit: (data: {
    patient_id: number;
    vital_data: { name: string; value: string }[];
  }) => void;
  action: "create" | "update";
}

// Define the form data interface
interface VitalFormData {
  name: string;
  value: string;
}

const VitalsForm = ({
  patientId,
  initialVitals,
  onSubmit,
  action,
}: VitalsFormProps) => {
  const defaultVitals: VitalFormData[] = [
    { name: "Heart Rate", value: "" },
    { name: "Blood Pressure", value: "" },
    { name: "Cholesterol", value: "" },
    { name: "Glucose", value: "" },
  ];

  const [vitals, setVitals] = useState<VitalFormData[]>(defaultVitals);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (action === "update" && initialVitals.length > 0) {
      // Transform the initialVitals to match our form structure
      const formattedVitals: VitalFormData[] = initialVitals.map((vital) => ({
        name: vital.name,
        value: vital.value,
      }));

      setVitals(formattedVitals);
    } else {
      setVitals(defaultVitals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialVitals, action]);

  const handleInputChange = (
    index: number,
    field: "name" | "value",
    value: string
  ) => {
    const updatedVitals = [...vitals];
    updatedVitals[index] = { ...updatedVitals[index], [field]: value };
    setVitals(updatedVitals);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out any empty vital entries
      const validVitals = vitals.filter(
        (vital) => vital.name.trim() && vital.value.trim()
      );

      const formData = {
        patient_id: patientId,
        vital_data: validVitals,
      };

      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting vitals:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        {vitals.map((vital, index) => (
          <div key={index} className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor={`vital-name-${index}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vital Name
              </label>
              <input
                id={`vital-name-${index}`}
                type="text"
                value={vital.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor={`vital-value-${index}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Value
              </label>
              <input
                id={`vital-value-${index}`}
                type="text"
                value={vital.value}
                onChange={(e) =>
                  handleInputChange(index, "value", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : action === "create"
            ? "Create"
            : "Update"}
        </button>
      </div>
    </form>
  );
};

export default VitalsForm;
