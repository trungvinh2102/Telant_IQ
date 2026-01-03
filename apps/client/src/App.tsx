import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { ROUTES } from "@/routes";
import { authService } from "@/services";
import { setCredentials, setLoading, logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { ProtectedRoute, PublicRoute } from "@/components/auth-guard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { PageLoader } from "./components/ui/page-loader";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        dispatch(setCredentials({ user }));
      } catch (err) {
        console.warn("Initial auth check failed:", err);
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {ROUTES.map(route => (
            <Route
              key={route.path}
              path={route.path === "/" ? undefined : route.path}
              index={route.path === "/"}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
