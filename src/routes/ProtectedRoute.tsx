import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar.tsx";
import { getRole } from "../utils/auth.ts";

type ProtectedRouteProps = {
  allowedRole: "CUSTOMER" | "SUPPORT_AGENT";
}

export default function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const role = getRole();

  if (!role || role !== allowedRole) 
    return <Navigate to="/sign-in" replace />;

  return (
    <div className="flex h-screen">
      <div className="w-1/5 h-full"><SideBar /></div>
      <div className="flex-1 h-full p-6"><Outlet /></div>
    </div>
  );
}