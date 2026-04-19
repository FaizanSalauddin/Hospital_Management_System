const AboutSection = () => {
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl"></div>
            <img 
              alt="modern hospital exterior" 
              className="rounded-xl shadow-2xl relative z-10 w-full object-cover aspect-[4/5]" 
              src="Frontend\src\assets\images\hospital.jpg"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-xl shadow-xl z-20 max-w-[200px]">
              <span className="block text-4xl font-extrabold text-primary mb-1">25+</span>
              <span className="text-sm font-medium text-on-surface-variant">Years of Clinical Excellence</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">The Sanctuary Philosophy</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-8 leading-tight">
              Advanced Care in a Healing Environment.
            </h2>
            <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
              The Clinical Curative was founded on the principle that the environment is just as vital as the treatment. Our facilities are designed to reduce cortisol levels and promote rapid neurological recovery.
            </p>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
              From our robotic-assisted surgical theaters to our patient-centric recovery suites, every square inch of our facility serves one purpose: your holistic well-being.
            </p>
            <a className="inline-block font-bold text-primary border-b-2 border-primary-fixed-dim pb-1 hover:border-primary transition-all" href="#">
              Explore Our Legacy →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection