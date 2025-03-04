import { useState, useEffect } from "react";
import api from "../../axios";
import { AxiosError } from "axios";

// Define types for the API response
interface Profile {
  id: number;
  user_id: number;
  gender: string | null;
  date_of_birth: string | null;
  address: string | null;
  phone_number: string | null;
  avatar: string | null;
}

interface Patient {
  id: number;
  user_id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  patient: Patient;
  profile: Profile;
}

interface ApiResponse {
  error: boolean;
  data: User;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get<ApiResponse>("/profile");
        setProfile(response.data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || error.message);
        } else {
          setError("An unexpected error occurred while fetching user profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
