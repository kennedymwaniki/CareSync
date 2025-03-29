import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../axios";
import { toast } from "sonner";

interface Profile {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  patient: {
    id: number;
    user_id: number;
  };
  profile: {
    id: number;
    user_id: number;
    gender: string | null;
    date_of_birth: string | null;
    address: string | null;
    phone_number: string | null;
    avatar: string | null;
  };
}

interface UpdateProfileFormProps {
  profile: Profile;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  gender: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
}

const UpdateProfileForm = ({
  profile,
  onSuccess,
  onCancel,
}: UpdateProfileFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: profile.name,
      gender: profile.profile.gender || "",
      date_of_birth: profile.profile.date_of_birth?.split("T")[0] || "",
      address: profile.profile.address || "",
      phone_number: profile.profile.phone_number || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const response = await api.patch("/profile", data);

      if (!response.data.error) {
        toast.success("Profile updated successfully");
        onSuccess();
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#454BE7] focus:border-[#454BE7]"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Gender
        </label>
        <select
          id="gender"
          {...register("gender")}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#454BE7] focus:border-[#454BE7]"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="date_of_birth"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date of Birth
        </label>
        <input
          id="date_of_birth"
          type="date"
          {...register("date_of_birth")}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#454BE7] focus:border-[#454BE7]"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Address
        </label>
        <input
          id="address"
          type="text"
          {...register("address")}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#454BE7] focus:border-[#454BE7]"
        />
      </div>

      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          id="phone_number"
          type="text"
          {...register("phone_number", {
            pattern: {
              value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
              message: "Invalid phone number format",
            },
          })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#454BE7] focus:border-[#454BE7]"
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone_number.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#454BE7] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#454BE7]"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
