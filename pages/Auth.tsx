import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, ChevronLeft } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Submitted ${activeTab} form:`, formData);
        // Add auth logic here
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Heritage Imagery */}
            <div className="hidden lg:block w-1/2 relative bg-stone-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1595995514697-39b6e80b2c65?q=80&w=2070&auto=format&fit=crop"
                    alt="Master Tailor at work"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-16 text-white max-w-xl">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px w-12 bg-gold-500"></div>
                        <span className="text-gold-500 uppercase tracking-widest text-sm font-bold">The Art of Bespoke</span>
                    </div>
                    <h1 className="text-5xl font-serif font-bold leading-tight mb-6">
                        "Elegance is not standing out, but being remembered."
                    </h1>
                    <p className="text-stone-300 text-lg leading-relaxed font-light">
                        Join India's exclusive network of heritage artisans. Preserve tradition, embrace luxury, and wear your legacy.
                    </p>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-ivory-50 relative">
                <Link to="/" className="absolute top-8 left-8 text-stone-500 hover:text-maroon-900 flex items-center gap-2 transition-colors">
                    <ChevronLeft size={20} /> Back to Home
                </Link>

                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-bold text-charcoal mb-2">
                            {activeTab === 'login' ? 'Welcome Back' : 'Join the Network'}
                        </h2>
                        <p className="text-stone-500">
                            {activeTab === 'login'
                                ? 'Enter your details to access your account'
                                : 'Create your account to start customizing'}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-stone-100 p-1 rounded-lg mb-8">
                        <button
                            className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${activeTab === 'login'
                                ? 'bg-white text-maroon-900 shadow-sm'
                                : 'text-stone-500 hover:text-stone-700'
                                }`}
                            onClick={() => setActiveTab('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${activeTab === 'signup'
                                ? 'bg-white text-maroon-900 shadow-sm'
                                : 'text-stone-500 hover:text-stone-700'
                                }`}
                            onClick={() => setActiveTab('signup')}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {activeTab === 'signup' && (
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-600 uppercase">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-maroon-900 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required={activeTab === 'signup'}
                                        className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 transition-all outline-none bg-white"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-600 uppercase">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-maroon-900 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 transition-all outline-none bg-white"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <label className="text-xs font-bold text-stone-600 uppercase">Password</label>
                                {activeTab === 'login' && (
                                    <a href="#" className="text-xs text-gold-700 font-medium hover:underline">Forgot Password?</a>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 group-focus-within:text-maroon-900 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 transition-all outline-none bg-white"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-3.5 text-base flex justify-center items-center gap-2 group shadow-lg shadow-maroon-900/10 hover:shadow-maroon-900/20 transform transition-all hover:-translate-y-0.5">
                            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-stone-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-ivory-50 px-3 text-stone-400 uppercase tracking-wider">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 rounded-lg text-stone-600 hover:bg-white hover:border-maroon-200 hover:text-maroon-900 transition-all text-sm font-medium bg-white shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 rounded-lg text-stone-600 hover:bg-white hover:border-maroon-200 hover:text-maroon-900 transition-all text-sm font-medium bg-white shadow-sm">
                            <Github size={20} />
                            GitHub
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-center text-xs text-stone-400">
                    &copy; 2024 VastraAngan. Protected by reCAPTCHA.
                </div>
            </div>
        </div>
    );
};

export default Auth;
