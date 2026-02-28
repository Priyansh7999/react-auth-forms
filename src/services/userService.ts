import type { LoginDetails, RegistrationDetails } from "../types/auth.js";

export const registerUser = async (values: RegistrationDetails) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/auth/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        }
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message || 'Registration failed');
    }
    return data;
}
export const loginUser = async (values: LoginDetails) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Login failed");
  }
  const token = data.data.token;
  localStorage.setItem("token", token);
  return data.data;
};