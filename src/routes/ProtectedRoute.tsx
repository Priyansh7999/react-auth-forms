import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth.ts";
import SideBar from "../components/SideBar.tsx";

type ProtectedRouteProps = {
  allowedRole: "CUSTOMER" | "AGENT";
}

export default function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const role = getUserRole();

  if (!role || role !== allowedRole) 
    return <Navigate to="/sign-in" replace />;

  return (
    <div className="flex h-screen">
      <div className="w-1/5 h-full"><SideBar /></div>
      <div className="flex-1 h-full p-6"><Outlet /></div>
    </div>
  );
}