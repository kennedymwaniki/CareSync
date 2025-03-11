import { useForm } from "react-hook-form";

export interface MedicationFormData {
  medication_name: string;
  dosage_quantity: string;
  dosage_strength: string;
  form: string;
  frequency: string;
  prescribed_date: string;
  duration: string;
  quantity_to_refill: string;
  current_stock: string;
  special_instructions: string;
}

const MedicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicationFormData>();

  const onSubmit = (data: MedicationFormData) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
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

        <div>
          <label
            htmlFor="dosage_quantity"
            className="block text-sm font-medium mb-1"
          >
            Dosage
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
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="dosage_strength"
            className="block text-sm font-medium mb-1"
          >
            Dosage
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

        <div>
          <label htmlFor="form" className="block text-sm font-medium mb-1">
            Form
          </label>
          <input
            id="form"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("form", { required: true })}
          />
          {errors.form && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium mb-1">
            Frequency
          </label>
          <input
            id="frequency"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("frequency", { required: true })}
          />
          {errors.frequency && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="prescribed_date"
            className="block text-sm font-medium mb-1"
          >
            Start Date
          </label>
          <input
            id="prescribed_date"
            type="date"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("prescribed_date", { required: true })}
          />
          {errors.prescribed_date && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="quantity_to_refill"
            className="block text-sm font-medium mb-1"
          >
            Quantity to Refill
          </label>
          <input
            id="quantity_to_refill"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("quantity_to_refill")}
          />
        </div>

        <div>
          <label
            htmlFor="current_stock"
            className="block text-sm font-medium mb-1"
          >
            Current Stock
          </label>
          <input
            id="current_stock"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("current_stock")}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="special_instructions"
          className="block text-sm font-medium mb-1"
        >
          Special Instructions
        </label>
        <textarea
          id="special_instructions"
          rows={4}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("special_instructions")}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Add Medication
        </button>
      </div>
    </form>
  );
};

export default MedicationForm;
