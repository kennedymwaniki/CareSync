import { useState, useEffect, useRef } from "react";
import api from "../../../axios";
import Loader from "../../components/Loader";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  User,
  Camera,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import Modal from "../../components/Modal";
import UpdateProfileForm from "./UpdateProfileForm";

// Define interfaces for patient profile data
interface PatientProfile {
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

const PatientProfile = () => {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPatientProfile();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/profile");
      console.log("API Response:", response.data); // Log the full response

      // Check the actual structure
      if (response.data && typeof response.data.error !== "undefined") {
        if (!response.data.error) {
          console.log("Setting profile with:", response.data.data);
          setProfile(response.data.data);
        } else {
          setError("Failed to fetch patient profile");
          toast.error("Could not load patient profile");
        }
      } else {
        console.log("Unexpected response structure:", response.data);
        // Try to handle alternative response formats
        if (response.data) {
          setProfile(response.data);
        } else {
          setError("Unexpected API response format");
          toast.error("Could not parse profile data");
        }
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast.error("Only JPEG, JPG and PNG images are allowed");
      return;
    }

    try {
      setUploading(true);

      // Create an image element to resize the image
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;

        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");

          // Define max dimensions for a much smaller image
          let width = img.width;
          let height = img.height;
          const maxWidth = 150; // Reduced from 300
          const maxHeight = 150; // Reduced from 300

          // Resize logic to maintain aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * (maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * (maxHeight / height));
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw the resized image on the canvas
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Get the resized image as JPEG with reduced quality
          const resizedImage = canvas.toDataURL("image/jpeg", 0.4); // Using 40% quality instead of 70%

          // Send the resized image to the server
          updateProfileImage(resizedImage);
        };
      };

      reader.onerror = () => {
        toast.error("Failed to process the image");
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload image");
      console.log(error); // Rethrow the error to be caught in the catch block
    } finally {
      setUploading(false);
    }
  };

  // New function to handle the API request
  const updateProfileImage = async (imageDataUrl: string) => {
    try {
      const response = await api.patch("/profile", {
        avatar: imageDataUrl,
      });

      if (!response.data.error) {
        toast.success("Profile image updated successfully");
        // Refresh profile data
        fetchPatientProfile();
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onProfileUpdate = () => {
    fetchPatientProfile();
    closeModal();
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
          {error || "Failed to load patient profile"}
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Photo and Basic Info */}
          <div className="bg-gradient-to-r from-[#454BE7] to-blue-500 p-6 text-white md:w-1/3">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={
                    profile.profile.avatar
                      ? profile.profile.avatar
                      : "https://www.flaticon.com/free-icon/hospital_6890395?term=hospital+placeholder&page=1&position=8&origin=search&related_id=6890395"
                  }
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white mb-4 object-cover"
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

              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-blue-100">Patient</p>

              <div className="mt-6 space-y-2 w-full">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="text-sm truncate">{profile.email}</span>
                </div>
                {profile.profile.phone_number && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="text-sm">
                      {profile.profile.phone_number}
                    </span>
                  </div>
                )}
                {profile.profile.address && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-sm truncate">
                      {profile.profile.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Personal Details */}
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <button
                onClick={openModal}
                className="px-4 py-2 bg-[#454BE7] text-white rounded-md flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Update Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.profile.gender && (
                <div className="flex items-start">
                  <User className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium capitalize">
                      {profile.profile.gender}
                    </p>
                  </div>
                </div>
              )}

              {profile.profile.date_of_birth && (
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">
                      {formatDate(profile.profile.date_of_birth)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">
                    {profile.profile.address || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium">
                    {profile.profile.phone_number || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-[#454BE7] mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="font-medium">
                    {profile.email_verified_at
                      ? formatDate(profile.email_verified_at)
                      : "Not verified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                Patient Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  Patient ID:
                  <span className="ml-2 font-medium">{profile.patient.id}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Update Profile">
        {profile && (
          <UpdateProfileForm
            profile={profile}
            onSuccess={onProfileUpdate}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default PatientProfile;
