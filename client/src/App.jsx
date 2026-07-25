import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeadDetails from "./pages/LeadDetails";
import Leads from "./pages/Leads";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Toaster position="top-right" />

            <Routes>

                {/* Redirect root */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["admin", "member"]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leads"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Leads />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leads/:id"
                    element={
                        <ProtectedRoute allowedRoles={["admin", "member"]}>
                            <LeadDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;