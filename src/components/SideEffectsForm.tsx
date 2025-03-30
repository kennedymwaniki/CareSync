import { useForm } from "react-hook-form";

// Define the form data interface
interface SideEffectFormData {
  medication: string;
  dateAndTime: string;
  severity: "Mild" | "Moderate" | "Severe"; // Modified to be a specific set of values
  duration: string;
  additionalNotes: string;
}

// SideEffectsForm component
const SideEffectsForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SideEffectFormData>();

  const onSubmit = (data: SideEffectFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="medication"
            className="block text-sm font-medium mb-1"
          >
            Medication
          </label>
          <input
            id="medication"
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("medication", { required: true })}
          />
          {errors.medication && (
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="severity" className="block text-sm font-medium mb-1">
            Severity
          </label>
          <select
            id="severity"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("severity", { required: true })}
          >
            <option value="">Select severity</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          {errors.severity && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium mb-1">
          Duration
        </label>
        <input
          id="duration"
          type="text"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("duration", { required: true })}
        />
        {errors.duration && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div>
        <label
          htmlFor="additionalNotes"
          className="block text-sm font-medium mb-1"
        >
          Additional Notes
        </label>
        <textarea
          id="additionalNotes"
          rows={4}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("additionalNotes")}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Add Side Effect
        </button>
      </div>
    </form>
  );
};

export default SideEffectsForm;
