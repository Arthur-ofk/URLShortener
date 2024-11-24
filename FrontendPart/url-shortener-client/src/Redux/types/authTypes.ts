export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: string; 
  }

export interface User {
    id: string;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    statusMessage: string |null,
}