import {jwtDecode} from "jwt-decode";

type Role = "CUSTOMER" | "AGENT";

interface DecodedToken {
  role: Role;
  exp: number;
}

export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const getUserRole = (): Role | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const { role, exp } = jwtDecode<DecodedToken>(token);
    if (exp < Date.now() / 1000) {
      removeToken();
      return null;
    }
    return role;
  } catch {
    removeToken();
    return null;
  }
};