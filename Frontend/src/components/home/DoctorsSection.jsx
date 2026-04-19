import { useEffect, useState } from "react";
import API from "../../services/api";
import DoctorCard from "../ui/DoctorCard";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);

  // 🔹 fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.log("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="container mx-auto px-6 max-w-screen-2xl">

        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-extrabold text-on-surface mb-4">
              The Clinical Board
            </h2>
            <p className="text-on-surface-variant">
              Global experts recruited from the world's leading medical institutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doc) => (
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
    </section>
  );
};

export default DoctorsSection;