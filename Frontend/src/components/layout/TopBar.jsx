const TopBar = () => {
  return (
    <div className="hidden md:block bg-primary text-white py-2 px-6">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">call</span>
            +1 (800) CURATIVE
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">mail</span>
            care@clinicalcurative.com
          </span>
        </div>
        <div className="flex gap-4">
          <span>Emergency: 911</span>
          <span className="opacity-70">Mon - Sat: 8:00 AM - 8:00 PM</span>
        </div>
      </div>
    </div>
  )
}

export default TopBar