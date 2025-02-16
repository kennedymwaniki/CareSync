export interface User {
  token: string;
  user: {
    id: string;
    role: string;
    name: string;
    email: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type VitalData = {
  id: string;
  vital_name: string;
  vital_value: string;
  vital_unit: string;
  vital_time: string;
  isNormal: boolean;
};

export interface StatItem {
  current: number;
  last: number;
  change: string;
  label: string;
}

interface PatientStats {
  medication: StatItem;
  caregiver: StatItem;
  side_effect: StatItem;
  diagnosis: StatItem;
}

export interface HealthVital {
  name: string;
  value: string;
  unit: string;
  isNormal: boolean;
}

export interface PatientDataResponse {
  patient_stats: PatientStats;
  health_vitals: HealthVital[];
}

interface Profile {
  id: number;
  user_id: number;
  gender: string | null;
  date_of_birth: string | null;
  address: string | null;
  phone_number: string | null;
  avatar: string | null;
}

interface UserRole {
  id: number;
  user_id: number;
  specialization: string | null;
  last_activity: string | null;
  license_number: string | null;
  license_issuing_body: string | null;
  clinic_name: string | null;
  clinic_address: string | null;
  active: string;
}

export interface CareGiver {
  id: number;
  name: string;
  email: string;
  role: string;
  profile: Profile;
  user_role: UserRole;
}

export interface CareGiverResponse {
  data: CareGiver[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export type CareProvider = {
  profile: string; // This will be derived from user_role.avatar
  name: string;
  role: string;
  specialty: string; // This will be derived from user_role.specialization
  active: boolean;
  lastActivity: string;
  openTime: string;
  status: string;
};
