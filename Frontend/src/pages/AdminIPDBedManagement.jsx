import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IPDBedAllocationPanel from "../components/ipd/IPDBedAllocationPanel";

const AdminIPDBedManagement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return <IPDBedAllocationPanel title="Admin IPD Bed Management" />;
};

export default AdminIPDBedManagement;
