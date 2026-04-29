export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  dob?: string;
  gender?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  exists?: boolean;
  token?: string;
}