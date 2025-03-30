import { useForm } from "react-hook-form";
import { createMedication } from "../apis/MedicationService";
import { toast } from "sonner";
import { useState } from "react";

export interface MedicationFormData {
  medication_name: string;
  dosage_quantity: string;
  dosage_strength: string;
  unit_id: number;
  form_id: number;
  route_id: number;
  frequency: string;
  duration: string;
  stock: string;
}

const unitOptions = [
  { id: 7, name: "dl" },
  { id: 11, name: "drops" },
  { id: 2, name: "g" },
  { id: 8, name: "iu" },
  { id: 4, name: "kg" },
  { id: 6, name: "l" },
  { id: 3, name: "mcg" },
  { id: 1, name: "mg" },
  { id: 5, name: "ml" },
  { id: 10, name: "syringe" },
  { id: 9, name: "unit" },
];

const formOptions = [
  { id: 1, name: "tablet" },
  { id: 2, name: "pill" },
  { id: 3, name: "liquid" },
  { id: 4, name: "injection" },
  { id: 5, name: "capsule" },
  { id: 6, name: "ointment" },
  { id: 7, name: "syringe" },
  { id: 8, name: "patch" },
  { id: 9, name: "suppository" },
  { id: 10, name: "inhaler" },
  { id: 11, name: "drop" },
  { id: 12, name: "vial" },
  { id: 13, name: "ampoule" },
];

const routeOptions = [
  { id: 1, name: "Oral (PO)" },
  { id: 2, name: "Sublingual (SL)" },
  { id: 3, name: "Enteral (NG or PEG)" },
  { id: 4, name: "Rectal (PR)" },
  { id: 5, name: "Inhalation (INH)" },
  { id: 6, name: "Intramuscular (IM)" },
  { id: 7, name: "Subcutaneous" },
  { id: 8, name: "Transdermal (TD)" },
];

const frequencyOptions = [
  { id: 1, frequency: "Once a day" },
  { id: 2, frequency: "Twice a day" },
  { id: 3, frequency: "Three times a day" },
  { id: 4, frequency: "Four times a day" },
  { id: 5, frequency: "Once every other day" },
  { id: 6, frequency: "Every third day" },
  { id: 7, frequency: "Once a week" },
  { id: 8, frequency: "Twice a week" },
  { id: 9, frequency: "Three times a week" },
  { id: 10, frequency: "Once a month" },
  { id: 11, frequency: "Every 6 hours" },
  { id: 12, frequency: "Every 8 hours" },
  { id: 13, frequency: "Every 12 hours" },
  { id: 14, frequency: "Every 24 hours" },
  { id: 15, frequency: "Every hour" },
  { id: 16, frequency: "Every 2 hours" },
  { id: 17, frequency: "Every 4 hours" },
  { id: 18, frequency: "Every 6 hours" },
];

interface PatientProp {
  patient_id: number;
  onSuccess?: () => void; // Add this optional callback
}

const MedicationForm = ({ patient_id, onSuccess }: PatientProp) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicationFormData>();

  const onSubmit = async (data: MedicationFormData) => {
    setIsSubmitting(true);
    try {
      // Create payload that includes patient_id
      const payload = {
        ...data,
        patient_id,
      };

      console.log(payload);
      const response = await createMedication(payload);
      if (!response) {
        throw new Error("No data received from server");
      }

      // Show success message
      toast.success("Medication added successfully!");
      reset();

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add medication. Please try again.";

      toast.error(errorMessage);
      console.error("Error creating medication:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Row 1: Medication Name */}
      <div>
        <label
          htmlFor="medication_name"
          className="block text-sm font-medium mb-1"
        >
          Medication Name
        </label>
        <input
          id="medication_name"
          type="text"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("medication_name", { required: true })}
        />
        {errors.medication_name && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      {/* Row 2: Dosage Quantity and Dosage Strength */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dosage_quantity"
            className="block text-sm font-medium mb-1"
          >
            Dosage Quantity
          </label>
          <input
            id="dosage_quantity"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("dosage_quantity", { required: true })}
          />
          {errors.dosage_quantity && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label
            htmlFor="dosage_strength"
            className="block text-sm font-medium mb-1"
          >
            Dosage Strength
          </label>
          <input
            id="dosage_strength"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("dosage_strength", { required: true })}
          />
          {errors.dosage_strength && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      {/* Row 3: Unit and Form */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="unit_id" className="block text-sm font-medium mb-1">
            Unit
          </label>
          <select
            id="unit_id"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("unit_id", { required: true })}
          >
            <option value="">Select Unit</option>
            {unitOptions.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          {errors.unit_id && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label htmlFor="form_id" className="block text-sm font-medium mb-1">
            Form
          </label>
          <select
            id="form_id"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("form_id", { required: true })}
          >
            <option value="">Select Form</option>
            {formOptions.map((form) => (
              <option key={form.id} value={form.id}>
                {form.name}
              </option>
            ))}
          </select>
          {errors.form_id && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      {/* Row 4: Route and Frequency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="route_id" className="block text-sm font-medium mb-1">
            Route
          </label>
          <select
            id="route_id"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("route_id", { required: true })}
          >
            <option value="">Select Route</option>
            {routeOptions.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
          {errors.route_id && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label
            htmlFor="frequency_id"
            className="block text-sm font-medium mb-1"
          >
            Frequency
          </label>
          <select
            id="frequency"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("frequency", { required: true })}
          >
            <option value="">Select Frequency</option>
            {frequencyOptions.map((frequency) => (
              <option key={frequency.id} value={frequency.frequency}>
                {frequency.frequency}
              </option>
            ))}
          </select>
          {errors.frequency && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      {/* Row 5: Duration and Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-1">
            Duration
          </label>
          <input
            id="duration"
            type="text"
            placeholder="e.g. 30 days"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("duration", { required: true })}
          />
          {errors.duration && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium mb-1">
            Stock
          </label>
          <input
            id="stock"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("stock", { required: true })}
          />
          {errors.stock && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded-md`}
        >
          {isSubmitting ? "Adding..." : "Add Medication"}
        </button>
      </div>
    </form>
  );
};

export default MedicationForm;
