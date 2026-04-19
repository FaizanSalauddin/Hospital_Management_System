import { Link } from 'react-router-dom'

const SpecialtiesSection = () => {
  return (
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-6">Specialized Centers of Excellence</h2>
          <p className="text-on-surface-variant text-lg">Our multi-disciplinary teams focus on complex cases with a collaborative approach that ensures no detail is overlooked.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cardiology */}
          <Link to="/specialty/cardiology" className="md:col-span-2 group relative overflow-hidden rounded-xl bg-primary text-white p-12 hover:scale-[1.01] transition-transform duration-500">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-6xl mb-6 text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>cardiology</span>
              <h3 className="text-3xl font-bold mb-4">Advanced Cardiovascular Center</h3>
              <p className="text-primary-fixed text-lg max-w-md mb-8">Pioneering minimally invasive heart procedures and personalized rhythm management protocols.</p>
              <button className="bg-white text-primary px-8 py-3 rounded-full font-bold">Discover More</button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none">
              <img alt="" className="h-full w-full object-cover" src="/images/cardiology-bg.jpg" />
            </div>
          </Link>

          {/* Neurology */}
          <Link to="/specialty/neurology" className="group p-10 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-4xl text-primary mb-6">neurology</span>
            <h3 className="text-2xl font-bold text-on-surface mb-4">Neurology</h3>
            <p className="text-on-surface-variant mb-6">Specialized treatments for complex brain and nervous system disorders.</p>
            <span className="text-primary font-bold">12 Specialists →</span>
          </Link>

          {/* Orthopaedics */}
          <Link to="/specialty/orthopedics" className="group p-10 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-4xl text-primary mb-6">orthopedics</span>
            <h3 className="text-2xl font-bold text-on-surface mb-4">Orthopaedics</h3>
            <p className="text-on-surface-variant mb-6">Expert care for skeletal, joint, and muscular health and recovery.</p>
            <span className="text-primary font-bold">View Center →</span>
          </Link>

          {/* Oncology */}
          <Link to="/specialty/oncology" className="md:col-span-2 p-12 bg-tertiary-fixed/20 rounded-xl relative overflow-hidden group">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <span className="material-symbols-outlined text-5xl text-tertiary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>oncology</span>
                <h3 className="text-3xl font-bold text-on-tertiary-fixed mb-4">Oncology Institute</h3>
                <p className="text-on-tertiary-fixed-variant text-lg">Next-generation immunotherapy and precision medicine for cancer care.</p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-tertiary">98%</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-on-tertiary-fixed-variant">Success Rate</span>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-tertiary">24/7</span>
                  <span className="text-xs uppercase font-bold tracking-widest text-on-tertiary-fixed-variant">Care Team</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SpecialtiesSection