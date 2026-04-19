const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
      <div className="h-80 overflow-hidden relative">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-sm">mail</span>
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-sm">share</span>
          </button>
        </div>
      </div>
      <div className="p-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{doctor.title}</span>
        <h4 className="text-xl font-bold text-on-surface mb-1">{doctor.name}</h4>
        <p className="text-on-surface-variant text-sm">{doctor.credentials}</p>
      </div>
    </div>
  )
}

export default DoctorCard