export default function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="hidden md:block">
        <div className="absolute left-0 top-1/4 -translate-x-1/2 opacity-40 scale-90 float-slow">
          {/* simple stethoscope */}
          <svg width="160" height="160" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="18" r="6" stroke="#3B82F6" strokeWidth="2" fill="#DBEAFE" />
            <path d="M32 24v12c0 6-8 6-8 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 24v12c0 6 8 6 8 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="absolute right-0 top-1/3 translate-x-1/2 opacity-40 scale-110 float-slower">
          {/* simple syringe */}
          <svg width="120" height="120" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="20" width="40" height="8" rx="2" stroke="#059669" strokeWidth="2" fill="#ECFDF5" />
            <path d="M44 24h12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 24v-6c0-2 2-4 4-4h8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="absolute left-0 bottom-24 -translate-x-1/3 opacity-30 scale-125 float-slow">
          {/* simple scalpel/knife */}
          <svg width="140" height="140" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 46c8-4 28-16 52-30" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <rect x="2" y="44" width="20" height="4" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
