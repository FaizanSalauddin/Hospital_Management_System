import { Link } from 'react-router-dom'

const SpecialtyNeurology = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <Link to="/" className="text-primary mb-8 inline-block">← Back to Home</Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-extrabold text-on-surface mb-6">Neurology Department</h1>
            <p className="text-xl text-on-surface-variant mb-6">
              Specialized treatments for complex brain and nervous system disorders with 12 world-class specialists.
            </p>
            <p className="text-on-surface-variant">
              Our neurology team uses advanced diagnostic tools and innovative treatment approaches for conditions like epilepsy, stroke, Parkinson's, and multiple sclerosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialtyNeurology