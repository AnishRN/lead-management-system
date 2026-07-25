import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
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

                {/* Public Landing Page */}
                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Staff Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["admin", "member"]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Leads */}
                <Route
                    path="/leads"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Leads />
                        </ProtectedRoute>
                    }
                />


                {/* Lead Details */}
                <Route
                    path="/leads/:id"
                    element={
                        <ProtectedRoute allowedRoles={["admin","member"]}>
                            <LeadDetails />
                        </ProtectedRoute>
                    }
                />


                {/* Fallback */}
                <Route
                    path="*"
                    element={
                        <Navigate to="/" replace />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
