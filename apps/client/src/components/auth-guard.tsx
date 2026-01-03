import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

interface AuthGuardProps {
  children: React.ReactNode;
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

/**
 * ProtectedRoute
 * Redirects to /login if the user is not authenticated
 */
export const ProtectedRoute: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * PublicRoute
 * Redirects to home if the user is already authenticated
 */
export const PublicRoute: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname || "/";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
