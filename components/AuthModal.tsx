import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import Button from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup logic
    console.log(`Submitted ${activeTab} form:`, formData);
    // In a real app, you would call an API here
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm animate-fade-in-up"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-maroon-900 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h2 className="text-3xl font-serif font-bold relative z-10">Welcome Back</h2>
          <p className="text-maroon-100 text-sm mt-2 relative z-10">Access your bespoke wardrobe journey</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100">
          <button
            className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${
              activeTab === 'login' 
                ? 'text-maroon-900 border-b-2 border-maroon-900 bg-stone-50' 
                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button
            className={`flex-1 py-4 text-sm font-bold tracking-wide transition-colors ${
              activeTab === 'signup' 
                ? 'text-maroon-900 border-b-2 border-maroon-900 bg-stone-50' 
                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            SIGN UP
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {activeTab === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="text"
                    required={activeTab === 'signup'}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 transition-all outline-none"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 transition-all outline-none"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-stone-500 uppercase">Password</label>
                {activeTab === 'login' && (
                  <a href="#" className="text-xs text-maroon-900 font-medium hover:underline">Forgot?</a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 transition-all outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-3 text-base flex justify-center items-center gap-2 group shadow-lg shadow-maroon-900/20">
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-stone-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login (Visual Only) */}
          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
             </button>
             <button className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all text-sm font-medium">
                <Github size={20} />
                GitHub
             </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-stone-50 p-4 text-center border-t border-stone-100">
          <p className="text-xs text-stone-500">
            By continuing, you agree to our <a href="#" className="underline hover:text-maroon-900">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
