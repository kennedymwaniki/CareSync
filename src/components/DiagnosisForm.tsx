import { useState } from "react";
import { useForm } from "react-hook-form";
import { createDiagnosis } from "../apis/DiagnosisService";
import { toast } from "sonner";

interface DiagnosisFormProps {
  patientId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface DiagnosisFormData {
  diagnosis_name: string;
  description: string;
  symptoms: string;
  date_diagnosed: string;
}

const DiagnosisForm = ({
  patientId,
  onSuccess,
  onCancel,
}: DiagnosisFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiagnosisFormData>({
    defaultValues: {
      diagnosis_name: "",
      description: "",
      symptoms: "",
      date_diagnosed: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: DiagnosisFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        patient_id: patientId,
        diagnosis_name: data.diagnosis_name,
        description: data.description || "",
        symptoms: data.symptoms || "",
        date_diagnosed: data.date_diagnosed,
      };

      await createDiagnosis(payload);
      toast.success("Diagnosis created successfully");
      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create diagnosis. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
      <div>
        <label
          htmlFor="diagnosis_name"
          className="block text-sm font-medium mb-1"
        >
          Diagnosis Name
        </label>
        <input
          id="diagnosis_name"
          type="text"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Hypertension"
          {...register("diagnosis_name", { required: true })}
        />
        {errors.diagnosis_name && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
          {...register("description")}
        ></textarea>
      </div>

      <div>
        <label htmlFor="symptoms" className="block text-sm font-medium mb-1">
          Symptoms (Optional)
        </label>
        <textarea
          id="symptoms"
          rows={3}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter symptoms"
          {...register("symptoms")}
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="date_diagnosed"
          className="block text-sm font-medium mb-1"
        >
          Date Diagnosed
        </label>
        <input
          id="date_diagnosed"
          type="date"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("date_diagnosed", { required: true })}
        />
        {errors.date_diagnosed && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Save Diagnosis"}
        </button>
      </div>
    </form>
  );
};

export default DiagnosisForm;
