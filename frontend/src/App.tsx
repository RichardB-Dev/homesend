import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ClientsPage } from "./pages/ClientsPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PricingPage } from "./pages/PricingPage";
import { PropertyPage } from "./pages/PropertyPage";
import { SelectPage } from "./pages/SelectPage";
import { SentPage } from "./pages/SentPage";
import { readSession } from "./storage";

function RequireAuth({ children }: { children: ReactNode }) {
  if (!readSession()) return <Navigate to="/sign-in" replace />;
  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route
        path="/select"
        element={
          <RequireAuth>
            <SelectPage />
          </RequireAuth>
        }
      />
      <Route
        path="/property/:id"
        element={
          <RequireAuth>
            <PropertyPage />
          </RequireAuth>
        }
      />
      <Route
        path="/clients"
        element={
          <RequireAuth>
            <ClientsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/sent"
        element={
          <RequireAuth>
            <SentPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
