import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/admin-login", form);

    localStorage.setItem("adminToken", res.data.token);

    navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 shadow rounded space-y-4">
        <h2 className="text-xl font-bold">Admin Login</h2>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button className="bg-black text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;