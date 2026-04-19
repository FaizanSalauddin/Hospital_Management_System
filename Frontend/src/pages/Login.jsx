import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.from || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await API.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login Successful ✅");
        navigate(redirectPath);
    };
 

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button className="bg-blue-600 text-white p-2 w-full">Login</button>
            </form>
            <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600">
                    Register
                </Link>
            </p>
        </div>

    );
};

export default Login;