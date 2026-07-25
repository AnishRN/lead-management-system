import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await api.post(
                "/auth/login",
                formData
            );

            // ✅ Update auth state
            login(data.user, data.token);

            toast.success("Login successful");

            // ✅ CRITICAL FIX: wait for state update
            setTimeout(() => {
                navigate("/dashboard");
            }, 50);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow p-4" style={{ width: "420px" }}>

            <h3 className="mb-4">Login</h3>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Email</label>

                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>

                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>
    );
};

export default LoginForm;