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
