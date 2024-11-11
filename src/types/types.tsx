export interface User {
  token: string;
  user: {
    role: string;
    id: string;
    fullName: string;
    email: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
