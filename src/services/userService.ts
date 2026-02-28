import api from "../api/axiosInstance.js";
import type { LoginDetails, RegistrationDetails } from "../types/auth.js";


export const registerUser = async (values: RegistrationDetails) => {
  try {
    const response = await api.post("/api/auth/register", values);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Registration failed"
    );
  }
};

