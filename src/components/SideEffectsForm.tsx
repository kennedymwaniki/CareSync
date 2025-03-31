import { useForm } from "react-hook-form";
import { useState } from "react";
import { createSideEffect, SideEffectPayload } from "../apis/SideEffects";
import { toast } from "sonner";

import MiniLoader from "./skeletonloaders/MiniLoader";

// Define the form data interface
interface SideEffectFormData {
  side_effect: string;
  dateAndTime: string;
  severity: "Mild" | "Moderate" | "Severe";
  duration: string;
  notes: string;
}

interface SideEffectsFormProps {
  medicationId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// SideEffectsForm component
const SideEffectsForm: React.FC<SideEffectsFormProps> = ({
  medicationId,
  onSuccess,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SideEffectFormData>({
    defaultValues: {
      side_effect: "",
      dateAndTime: new Date().toISOString().slice(0, 16), // Current datetime
      severity: "Mild",
      duration: "",
      notes: "",
    },
  });

  const onSubmit = async (data: SideEffectFormData) => {
    setIsSubmitting(true);

    try {
      // Create the payload in the format expected by the API
      const payload: SideEffectPayload = {
        medication_id: medicationId,
        datetime: data.dateAndTime.replace("T", " ") + ":00", // Format to match "2025-01-11 12:33:26"
        side_effect: data.side_effect,
        severity: data.severity,
        duration: data.duration ? parseInt(data.duration) : null,
        notes: data.notes || null,
      };

      await createSideEffect(payload);
      toast.success("Side effect reported successfully");
      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to report side effect"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="side_effect"
            className="block text-sm font-medium mb-1"
          >
            Side Effect
          </label>
          <input
            id="side_effect"
            type="text"
            placeholder="e.g., Nausea, Headache, Rash"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("side_effect", { required: true })}
          />
          {errors.side_effect && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label
            htmlFor="dateAndTime"
            className="block text-sm font-medium mb-1"
          >
            Date and Time
          </label>
          <input
            id="dateAndTime"
            type="datetime-local"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("dateAndTime", { required: true })}
          />
          {errors.dateAndTime && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label htmlFor="severity" className="block text-sm font-medium mb-1">
            Severity
          </label>
          <select
            id="severity"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("severity", { required: true })}
          >
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          {errors.severity && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-1">
            Duration (hours)
          </label>
          <input
            id="duration"
            type="number"
            min="0"
            placeholder="Optional"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("duration")}
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            placeholder="Optional - Any additional information"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("notes")}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-70 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <MiniLoader /> <span className="ml-2">Submitting...</span>
            </>
          ) : (
            "Report Side Effect"
          )}
        </button>
      </div>
    </form>
  );
};

export default SideEffectsForm;
