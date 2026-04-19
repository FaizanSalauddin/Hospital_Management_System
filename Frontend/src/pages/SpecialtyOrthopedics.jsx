import { Link } from 'react-router-dom'

const SpecialtyOrthopedics = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <Link to="/" className="text-primary mb-8 inline-block">← Back to Home</Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-extrabold text-on-surface mb-6">Orthopaedics Center</h1>
            <p className="text-xl text-on-surface-variant mb-6">
              Expert care for skeletal, joint, and muscular health and recovery.
            </p>
            <p className="text-on-surface-variant">
              From sports injuries to joint replacements, our orthopaedic surgeons provide comprehensive care using the latest minimally invasive techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialtyOrthopedics