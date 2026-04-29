import API from './apiClient';
import type { UserData, AuthResponse } from '../types/types';

// Check if a user exists
export const checkPhone = (phone: string) => 
  API.post<AuthResponse>('/auth/check-phone', { phone });

// Send OTP code
export const sendOtp = (phone: string) => 
  API.post<AuthResponse>('/auth/send-otp', { phone });

// Verify OTP code
export const verifyOtp = (otp: string) => 
  API.post<AuthResponse>('/auth/verify-otp', { otp });

// Final Registration
export const registerUser = (userData: UserData) => 
  API.post<AuthResponse>('/auth/register', userData);