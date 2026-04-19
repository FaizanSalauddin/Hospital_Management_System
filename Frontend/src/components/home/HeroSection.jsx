const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      <div className="absolute inset-0 z-0">
        <img 
          alt="modern hospital interior" 
          className="w-full h-full object-cover opacity-20" 
          src="https://global-uploads.webflow.com/5eec789d24d891b6d1d15438/5f591fb0c03828fbc9393cb2_s02_RSM-Design_The-Star-Sports-Medicine-Facility_Exterior-Hospital-Architecture.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-screen-2xl">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-widest uppercase mb-6">
            World-Class Medical Sanctuary
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-8">
            Your Health is Our <span className="text-primary italic">Highest</span> Priority.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-12 leading-relaxed max-w-xl">
            Experience medicine reimagined through editorial precision and compassionate care. We blend advanced technology with a human-centric approach.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold text-lg hover:shadow-xl transition-all">
              Start Your Recovery
            </button>
            <button className="px-10 py-4 bg-surface-container-highest text-on-primary-fixed-variant rounded-full font-bold text-lg hover:bg-surface-container-high transition-all">
              Our Specialties
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection