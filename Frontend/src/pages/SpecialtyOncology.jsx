import { Link } from 'react-router-dom'

const SpecialtyOncology = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <Link to="/" className="text-primary mb-8 inline-block">← Back to Home</Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-extrabold text-on-surface mb-6">Oncology Institute</h1>
            <p className="text-xl text-on-surface-variant mb-6">
              Next-generation immunotherapy and precision medicine for cancer care with a 98% success rate.
            </p>
            <p className="text-on-surface-variant">
              Our oncology team provides compassionate, cutting-edge cancer care with personalized treatment plans and 24/7 support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialtyOncology