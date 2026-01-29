import React from 'react';
import { Menu, Search, User, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isTailorPortal = location.pathname.includes('/partner');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-ivory text-charcoal relative overflow-x-hidden">



      {/* Header */}
      <header className="sticky top-0 z-40 bg-sky-50/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            {/* <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex flex-col items-start group">
                <h1 className="text-2xl font-serif font-bold text-maroon-900 tracking-tight group-hover:text-maroon-800 transition-colors">
                  BHARAT<span className="text-gold-600">TAILOR</span>
                </h1>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-stone-500 font-medium ml-0.5">
                  Network
                </span>
              </Link>
            </div> */}

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {!isTailorPortal ? (
                <>
                  <Link to="/discovery" className="text-stone-900 hover:text-maroon-900 font-medium text-sm tracking-wide">FIND A TAILOR</Link>
                  <Link to="/heritage" className="text-stone-900 hover:text-maroon-900 font-medium text-sm tracking-wide">HERITAGE CRAFTS</Link>
                  <Link to="/how-it-works" className="text-stone-900 hover:text-maroon-900 font-medium text-sm tracking-wide">HOW IT WORKS</Link>
                </>
              ) : (
                <span className="text-maroon-900 font-bold border-b-2 border-maroon-900">PARTNER PORTAL</span>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              <Link to="/partner/dashboard" className="hidden sm:block text-xs font-bold text-maroon-900 border border-maroon-900 px-3 py-1.5 rounded hover:bg-maroon-900 hover:text-white transition-all uppercase tracking-wide">
                {isTailorPortal ? 'Exit Portal' : 'For Tailors'}
              </Link>
              <button className="text-stone-600 hover:text-maroon-900 transition-colors">
                <Search size={20} />
              </button>
              <button className="text-stone-600 hover:text-maroon-900 relative transition-colors">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-saffron-600 rounded-full animate-pulse"></span>
              </button>
              <Link
                to="/auth"
                className="text-stone-600 hover:text-maroon-900 transition-colors"
                title="Sign In / Register"
              >
                <User size={20} />
              </Link>
              <button className="md:hidden text-stone-600">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>



      {/* Main Content */}
      <main className="flex-grow z-10 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t-4 border-gold-600 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-lg font-serif mb-4">BHARAT<span className="text-gold-600">TAILOR</span></h2>
            <p className="text-sm leading-relaxed mb-6">
              Connecting India's finest heritage craftsmanship with the modern world. Verified, Trusted, Timeless.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-gold-600 text-white transition-colors cursor-pointer">IG</div>
              <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-gold-600 text-white transition-colors cursor-pointer">TW</div>
              <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-gold-600 text-white transition-colors cursor-pointer">FB</div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-serif mb-4 text-sm uppercase tracking-widest">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-500">About Us</a></li>
              <li><a href="#" className="hover:text-gold-500">Verification Process</a></li>
              <li><a href="#" className="hover:text-gold-500">Escrow Protection</a></li>
              <li><a href="#" className="hover:text-gold-500">Tailor Directory</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif mb-4 text-sm uppercase tracking-widest">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-500">Track Order</a></li>
              <li><a href="#" className="hover:text-gold-500">Quality Guarantee</a></li>
              <li><a href="#" className="hover:text-gold-500">Returns & Alterations</a></li>
              <li><a href="#" className="hover:text-gold-500">Partner Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif mb-4 text-sm uppercase tracking-widest">Government & Trust</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 opacity-80">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-[10px] text-white">MSME</div>
                <span className="text-xs">Registered MSME Partner</span>
              </div>
              <div className="flex items-center space-x-3 opacity-80">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-[10px] text-white">ISO</div>
                <span className="text-xs">ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>© 2024 BharatTailor Network. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;