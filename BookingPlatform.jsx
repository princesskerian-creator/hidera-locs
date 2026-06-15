import React, { useState } from 'react';

// Mock Data for Services
const SERVICES_DATA = [
  { id: 1, name: 'Premium Hair Styling', category: 'Hair', price: '₦25,000', duration: '90 mins', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Luxury Dreadlocks Installation', category: 'Locs', price: '₦45,000', duration: '180 mins', image: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9eaf4?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Deep Conditioning & Treatment', category: 'Hair', price: '₦15,000', duration: '45 mins', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Sisterlocks Retightening', category: 'Locs', price: '₦30,000', duration: '120 mins', image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Bridal Styling Package', category: 'Events', price: '₦80,000', duration: '150 mins', image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80' },
];

export default function BookingPlatform() {
  // State Management
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', date: '', time: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter Logic
  const filteredServices = activeCategory === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(service => service.category === activeCategory);

  // Form Submission Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.date || !bookingDetails.time) {
      alert("Please fill out all fields.");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setBookingDetails({ name: '', email: '', date: '', time: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 font-sans antialiased">
      
      {/* 1. HEADER & NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-amber-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-widest text-amber-500">
            AURUM<span className="text-white font-sans font-light text-sm tracking-normal ml-1">STUDIO</span>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-medium">
            <a href="#hero" className="hover:text-amber-500 transition-colors">Home</a>
            <a href="#services" className="hover:text-amber-500 transition-colors">Services</a>
            <a href="#book" className="hover:text-amber-500 transition-colors">Book Appointment</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="#book" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2.5 rounded-sm transition-all shadow-lg shadow-amber-500/10 text-sm tracking-wider uppercase">
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-amber-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#141414] border border-amber-500/20 rounded p-4 flex flex-col space-y-4 text-center">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 py-2">Home</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 py-2">Services</a>
            <a href="#book" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 py-2">Book Appointment</a>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative h-[75vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(13,13,13,0.6), rgba(13,13,13,1)), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80')` }}>
        <div className="text-center max-w-3xl px-6">
          <span className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase block mb-3">Premium Styling Experience</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Elevate Your Look, <br />Empower Your Crown
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
            Experience premium, precision-crafted frontend designs brought to life through elite styling services. Luxury built on modern architecture.
          </p>
          <a href="#services" className="border border-amber-500 hover:bg-amber-500/10 text-amber-500 px-8 py-3.5 tracking-widest font-medium uppercase text-xs transition-all rounded-sm">
            Explore Services
          </a>
        </div>
      </section>

      {/* 3. INTERACTIVE SERVICES FILTERS & INTERFACE */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-2">Our Menu</span>
            <h2 className="text-3xl font-serif font-bold text-white">Select a Premium Service</h2>
          </div>
          
          {/* Architecture Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-[#141414] p-1.5 rounded-sm border border-gray-800">
            {['All', 'Hair', 'Locs', 'Events'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all rounded-sm ${activeCategory === category ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Grid Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className={`bg-[#141414] border transition-all rounded-sm overflow-hidden group flex flex-col justify-between ${selectedService.id === service.id ? 'border-amber-500 shadow-xl shadow-amber-500/5' : 'border-gray-800/80 hover:border-gray-700'}`}
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-amber-500 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm border border-amber-500/20">
                    {service.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-white mb-2">{service.name}</h3>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 font-light">
                    <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1 text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{service.duration}</span>
                    <span className="text-amber-500 font-medium text-sm">{service.price}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => {
                    setSelectedService(service);
                    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-center py-2.5 text-xs font-semibold uppercase tracking-widest border transition-all rounded-sm ${selectedService.id === service.id ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'border-gray-800 bg-transparent text-gray-400 hover:text-white hover:border-gray-600'}`}
                >
                  {selectedService.id === service.id ? 'Selected' : 'Select Service'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOOKING FORM SECTION */}
      <section id="book" className="bg-[#111111] border-t border-b border-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-2">Secure Checkout</span>
            <h2 className="text-3xl font-serif font-bold text-white">Complete Your Session Booking</h2>
            <p className="text-gray-400 text-sm mt-2 font-light">
              Reviewing reservation parameters for: <span className="text-amber-500 font-semibold">{selectedService.name} ({selectedService.price})</span>
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-amber-500/10 border border-amber-500/30 p-8 text-center rounded-sm max-w-xl mx-auto animate-fadeIn">
              <svg className="w-16 h-16 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-serif font-semibold text-white mb-2">Booking Success!</h3>
              <p className="text-gray-400 text-sm font-light">
                Thank you, <span className="text-white font-medium">{bookingDetails.name}</span>. Your reservation for <span className="text-amber-500 font-medium">{selectedService.name}</span> has been simulated successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="bg-[#161616] border border-gray-800/60 p-8 md:p-10 rounded-sm max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Chinecherem Kerian" 
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                  className="bg-[#0d0d0d] border border-gray-800 focus:border-amber-500 text-white rounded-sm px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com" 
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  className="bg-[#0d0d0d] border border-gray-800 focus:border-amber-500 text-white rounded-sm px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                  className="bg-[#0d0d0d] border border-gray-800 focus:border-amber-500 text-white rounded-sm px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Preferred Time</label>
                <input 
                  type="time" 
                  required
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                  className="bg-[#0d0d0d] border border-gray-800 focus:border-amber-500 text-white rounded-sm px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold uppercase tracking-widest py-3.5 text-xs rounded-sm transition-all shadow-lg shadow-amber-500/10"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#0d0d0d] text-center py-8 text-xs text-gray-500 border-t border-gray-900 tracking-wider">
        &copy; {new Date().getFullYear()} HIDERALOCS. Handcrafted in React & Tailwind CSS.
      </footer>

    </div>
  );
}