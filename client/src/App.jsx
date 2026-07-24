import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Toaster
                position="top-right"
            />

            <Routes>

                <Route

                    path="/"

                    element={<Navigate to="/login" replace />}

                />

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="*"

                    element={<Navigate to="/login" replace />}

                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;