import { Link } from 'react-router-dom'

const SpecialtyCardiology = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <Link to="/" className="text-primary mb-8 inline-block">← Back to Home</Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-extrabold text-on-surface mb-6">Advanced Cardiovascular Center</h1>
            <p className="text-xl text-on-surface-variant mb-6">
              Pioneering minimally invasive heart procedures and personalized rhythm management protocols.
            </p>
            <p className="text-on-surface-variant">
              Our cardiology department combines cutting-edge technology with compassionate care to deliver the best outcomes for our patients.
            </p>
          </div>
          <div className="bg-primary rounded-xl p-12 text-white">
            <span className="material-symbols-outlined text-7xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>cardiology</span>
            <h3 className="text-2xl font-bold mb-2">24/7 Emergency Cardiac Care</h3>
            <p>Rapid response team available around the clock</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialtyCardiology