import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorCard from "../components/ui/DoctorCard";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    };
    fetchDoctors();
  }, []);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <h1 className="text-5xl font-bold mb-10">Doctors</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={{
                name: doc.name,
                title: doc.specialization,
                credentials: doc.availableTime,
                image: "https://via.placeholder.com/300"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;