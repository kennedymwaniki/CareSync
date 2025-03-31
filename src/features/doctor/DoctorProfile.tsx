import { useState, useEffect, useRef } from "react";
import api from "../../../axios";
import Loader from "../../components/Loader";
import {
  Phone,
  Mail,
  MapPin,
  Award,
  Clock,
  Clipboard,
  Building,
  Camera,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import UpdateDoctorProfileForm from "./UpdateDoctorProfileForm";

interface DoctorProfile {
  id: number;
  user_id: number;
  specialization: string | null;
  last_activity: string | null;
  license_number: string | null;
  license_issuing_body: string | null;
  clinic_name: string | null;
  clinic_address: string | null;
  active: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    profile: {
      id: number;
      user_id: number;
      gender: string | null;
      date_of_birth: string | null;
      address: string | null;
      phone_number: string | null;
      avatar: string | null;
    };
  };
}

const DoctorProfile = () => {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get("/user/doctor");
      if (!response.data.error) {
        setProfile(response.data.data);
      } else {
        setError("Failed to fetch doctor profile");
        toast.error("Could not load doctor profile");
      }
    } catch (error) {
      setError("An error occurred while fetching profile");
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Check file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast.error("Only JPEG, JPG and PNG images are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const response = await api.patch("/user/doctor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.error) {
        toast.success("Profile image updated successfully");
        // Refresh profile data
        fetchDoctorProfile();
      } else {
        toast.error(response.data.message || "Failed to update profile image");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload image");
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          {error || "Failed to load doctor profile"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#454BE7] text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doctor Profile</h1>
        <button
          onClick={() => setShowUpdateForm(true)}
          className="px-4 py-2 bg-[#454BE7] text-white rounded-md flex items-center"
          aria-label="Update Profile"
        >
          <Edit className="w-4 h-4 mr-2" />
          Update Profile
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Photo and Basic Info */}
          <div className="bg-gradient-to-r from-[#454BE7] to-blue-500 p-6 text-white md:w-1/3">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={
                    profile.user.profile.avatar &&
                    profile.user.profile.avatar !== "null"
                      ? profile.user.profile.avatar
                      : "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(profile.user.name) +
                        "&background=4A56E2&color=fff"
                  }
                  alt={profile.user.name}
                  className="w-32 h-32 rounded-full border-4 border-white mb-4 object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(profile.user.name) +
                      "&background=4A56E2&color=fff";
                  }}
                />
                <div
                  onClick={handleImageClick}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                >
                  {uploading ? (
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-white" />
                      <span className="sr-only">Change Image</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
              </div>

              <h2 className="text-xl font-bold">{profile.user.name}</h2>
              <p className="text-blue-100">
                {profile.specialization || "General Practitioner"}
              </p>
              <p className="mt-1 text-sm bg-blue-600 bg-opacity-50 px-3 py-1 rounded-full">
                {profile.active === "1" ? "Active" : "Inactive"}
              </p>

              <div className="mt-6 space-y-2 w-full">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="text-sm truncate">{profile.user.email}</span>
                </div>
                {profile.user.profile.phone_number && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="text-sm">
                      {profile.user.profile.phone_number}
                    </span>
                  </div>
                )}
                {profile.user.profile.address && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-sm truncate">
                      {profile.user.profile.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Professional Details */}
          <div className="p-6 md:w-2/3">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="font-medium">
                    {profile.license_number || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clipboard className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Issuing Body</p>
                  <p className="font-medium">
                    {profile.license_issuing_body || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Building className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Clinic Name</p>
                  <p className="font-medium">
                    {profile.clinic_name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Clinic Address</p>
                  <p className="font-medium">
                    {profile.clinic_address || "Not provided"}
                  </p>
                </div>
              </div>

              {profile.user.profile.gender && (
                <div className="flex items-start">
                  <div className="w-5 h-5 text-[#454BE7] mr-3 flex items-center justify-center">
                    {profile.user.profile.gender === "male" ? "♂" : "♀"}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium capitalize">
                      {profile.user.profile.gender}
                    </p>
                  </div>
                </div>
              )}

              {profile.last_activity && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Last Active</p>
                    <p className="font-medium">
                      {new Date(profile.last_activity).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                Availability
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  Current Status:
                  <span
                    className={`ml-2 font-medium ${
                      profile.active === "1" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profile.active === "1"
                      ? "Available for Consultations"
                      : "Currently Unavailable"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpdateForm && profile && (
        <UpdateDoctorProfileForm
          profile={profile}
          onClose={() => setShowUpdateForm(false)}
          onSuccess={fetchDoctorProfile}
        />
      )}
    </div>
  );
};

export default DoctorProfile;
