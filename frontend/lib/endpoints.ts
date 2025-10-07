export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const LOGIN_EP = `${API_BASE_URL}/api/login`;
export const SIGNUP_EP = `${API_BASE_URL}/api/signup`;
export const OTP_EP = `${API_BASE_URL}/api/verify-otp`;
