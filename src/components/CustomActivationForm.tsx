import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { activateMedication } from "../apis/MedicationService";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export interface CustomActivationFormProps {
  medicationId: number;
  onSuccess?: () => void;
}

interface ActivationFormData {
  schedules: string[];
  start_datetime: Date;
}

const CustomActivationForm = ({
  medicationId,
  onSuccess,
}: CustomActivationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleInputs, setScheduleInputs] = useState<string[]>([""]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivationFormData>({
    defaultValues: {
      schedules: [""],
      start_datetime: new Date(),
    },
  });

  const addScheduleInput = () => {
    setScheduleInputs([...scheduleInputs, ""]);
  };

  const removeScheduleInput = (index: number) => {
    const newInputs = [...scheduleInputs];
    newInputs.splice(index, 1);
    setScheduleInputs(newInputs);
  };

  const validateTimeFormat = (value: string) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(value) || "Time must be in format HH:MM (24-hour)";
  };

  const onSubmit = async (data: ActivationFormData) => {
    setIsSubmitting(true);
    try {
      // Filter out empty schedule values
      const schedules = scheduleInputs.filter(
        (schedule) => schedule.trim() !== ""
      );

      if (schedules.length === 0) {
        toast.error("At least one schedule is required");
        setIsSubmitting(false);
        return;
      }

      // Format the date for the API
      const formattedDateTime = format(
        data.start_datetime,
        "yyyy-MM-dd HH:mm:ss"
      );

      const payload = {
        medication_id: medicationId,
        schedules: schedules,
        start_datetime: formattedDateTime,
      };

      console.log("Submitting activation data:", payload);

      const response = await activateMedication(payload);

      if (!response) {
        throw new Error("No response received from server");
      }

      toast.success("Medication activated successfully!");

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to activate medication. Please try again.";

      toast.error(errorMessage);
      console.error("Error activating medication:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium mb-1">Medication ID</label>
        <input
          type="text"
          value={medicationId}
          disabled
          className="w-full border rounded-md p-2 bg-gray-100"
        />
        <p className="text-sm text-gray-500 mt-1">
          Medication ID cannot be changed
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Schedules (Time in 24-hour format, e.g., 15:30)
        </label>
        <div className="space-y-2">
          {scheduleInputs.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="HH:MM"
                className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`schedules.${index}` as const, {
                  required: "Schedule time is required",
                  validate: validateTimeFormat,
                })}
                onChange={(e) => {
                  const newInputs = [...scheduleInputs];
                  newInputs[index] = e.target.value;
                  setScheduleInputs(newInputs);
                }}
                value={scheduleInputs[index]}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeScheduleInput(index)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.schedules && (
            <span className="text-red-500 text-sm">
              {errors.schedules.message ||
                "All schedules must be in valid time format"}
            </span>
          )}
          <button
            type="button"
            onClick={addScheduleInput}
            className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md text-sm"
          >
            + Add Another Schedule
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Start Date and Time
        </label>
        <Controller
          control={control}
          name="start_datetime"
          rules={{ required: "Start date and time is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              minDate={new Date()}
            />
          )}
        />
        {errors.start_datetime && (
          <span className="text-red-500 text-sm">
            {errors.start_datetime.message}
          </span>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded-md`}
        >
          {isSubmitting ? "Activating..." : "Activate Medication"}
        </button>
      </div>
    </form>
  );
};

export default CustomActivationForm;
