export interface User {
  id: number;
  role: string;
  name: string;
  email: string;
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
  profile: string;
  name: string;
  role: string;
  specialty: string;
  active: boolean;
  lastActivity: string;
  openTime: string;
  status: string;
};

// Add these types if not already present
export interface Vital {
  name: string;
  value: string;
  unit: string;
  isNormal: boolean;
}

export interface VitalsResponse {
  error: boolean;
  patient_id: string;
  vitals: Vital[];
}

export interface Vital {
  name: string;
  value: string;
  unit: string;
  isNormal: boolean;
}

export interface VitalsResponse {
  error: boolean;
  patient_id: string;
  vitals: Vital[];
}

export interface Patient {
  patient_id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Doctor {
  doctor_id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Form {
  id: number;
  name: string;
  patient_id: number | null;
}

export interface Route {
  id: number;
  name: string;
  description: string;
}

export interface Diagnosis {
  id: number;
  patient_id: number;
  diagnosis_name: string;
  description: string | null;
  symptoms: string | null;
  date_diagnosed: string;
  doctor_id: number;
}

export interface MedicationResponse {
  id: number;
  patient: Patient;
  medication_name: string;
  dosage_quantity: string;
  dosage_strength: string;
  form: Form;
  route: Route;
  frequency: string;
  duration: string;
  prescribed_date: string;
  doctor: Doctor;
  caregiver: null | number;
  stock: number;
  active: number;
  diagnosis: Diagnosis;
}

export interface ApiResponse {
  data: MedicationResponse[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}

export interface DiagnosisResponse {
  id: number;
  diagnosis_name: string;
  description: string | null;
  date_diagnosed: string;
  patient: {
    id: number;
    name: string;
    email: string;
  };
  doctor: {
    id: number;
    name: string;
    email: string;
  };
  medication_counts: number;
}
