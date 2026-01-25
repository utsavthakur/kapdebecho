import React from 'react';
import HowItWorksSection from '../components/HowItWorksSection';
import { Shield, Users, Scissors, Globe, Smartphone, Brain, Lock, RefreshCw, BadgeCheck, Scale } from 'lucide-react';

const HowItWorks: React.FC = () => {
    return (
        <div className="bg-ivory min-h-screen pt-20 font-sans text-charcoal">

            {/* 1. Hero / Vision Section */}
            <section className="relative py-20 px-4 overflow-hidden bg-stone-900 text-ivory">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-block px-4 py-1.5 border border-gold-500/50 rounded-full text-gold-400 text-xs font-serif tracking-widest uppercase mb-6">
                        Official National Custom Tailoring Platform
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                        Connecting India's Master Tailors <br /> <span className="text-gold-500 italic">to the Nation.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto font-light leading-relaxed">
                        We are building India’s first national digital infrastructure for legacy craftsmanship. Bridging the gap between heritage artisans and modern wardrobes with trust, logistics, and quality assurance.
                    </p>
                </div>
            </section>

            {/* 2. The Core Problem (Pain Points) */}
            <section className="py-24 max-w-7xl mx-auto px-4 relative bg-amber-50/80">
                {/* Texture */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none mix-blend-multiply"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                    {/* Customer Pain */}
                    <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-sm border-2 border-dashed border-stone-300 transform hover:-rotate-1 transition-transform duration-300">
                        <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-stone-900">
                            <span className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center text-maroon-900 border border-maroon-100"><Users size={20} /></span>
                            For The Customer
                        </h3>
                        <ul className="space-y-4 text-stone-600">
                            <li className="flex gap-3">
                                <span className="text-red-800 font-bold">×</span>
                                <span>Limited access to authentic regional crafts (Banarasi, Lucknowi, Kanchipuram) without traveling.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-800 font-bold">×</span>
                                <span>Fear of fraud, poor quality fabric, or ill-fitting garments from unknown remote tailors.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-800 font-bold">×</span>
                                <span>Lack of standardized sizing and zero recourse for alterations.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Tailor Pain */}
                    <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-sm border-2 border-dashed border-stone-300 transform hover:rotate-1 transition-transform duration-300">
                        <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-stone-900">
                            <span className="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center text-gold-700 border border-gold-200"><Scissors size={20} /></span>
                            For The Artisan
                        </h3>
                        <ul className="space-y-4 text-stone-600">
                            <li className="flex gap-3">
                                <span className="text-red-800 font-bold">×</span>
                                <span>Limited to local foot traffic; zero digital presence to reach national buyers.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-800 font-bold">×</span>
                                <span>No logistics or payment infrastructure to handle long-distance orders securely.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-800 font-bold">×</span>
                                <span>Struggling to compete with mass-produced fast fashion.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 text-center relative z-10">
                    <div className="inline-flex items-center gap-4 bg-maroon-900 text-ivory px-8 py-3 rounded-full font-medium shadow-lg border border-gold-500/30">
                        <BadgeCheck className="text-gold-500" size={20} />
                        <span>The Solution: <strong>BharatTailor Network</strong> — A Digital Bridge.</span>
                    </div>
                </div>
            </section>

            {/* 3. Platform Architecture (3-Sided System) */}
            <section className="py-24 bg-indigo-50/60 border-y border-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-indigo-950 mb-4">A Unified Trust Ecosystem</h2>
                        <p className="text-indigo-800/70">Orchestrating complex interactions with seamless technology.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Consumer App */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-900 hover:shadow-2xl transition-shadow duration-300">
                            <div className="mb-6 text-indigo-900 p-3 bg-indigo-50 rounded-lg inline-block"><Globe size={32} /></div>
                            <h3 className="text-xl font-bold mb-4 font-serif text-indigo-950">Customer Platform</h3>
                            <p className="text-sm text-stone-600 mb-6">Discovery, customization, and tracking interface.</p>
                            <ul className="space-y-2 text-sm text-stone-500">
                                <li>• Region & Craft Filters</li>
                                <li>• Verified Tailor Portfolios</li>
                                <li>• AI-Guided Measurements</li>
                                <li>• Secure Escrow Payments</li>
                            </ul>
                        </div>

                        {/* Partner Portal */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-600 hover:shadow-2xl transition-shadow duration-300">
                            <div className="mb-6 text-indigo-600 p-3 bg-indigo-50 rounded-lg inline-block"><Smartphone size={32} /></div>
                            <h3 className="text-xl font-bold mb-4 font-serif text-indigo-950">Tailor Partner Portal</h3>
                            <p className="text-sm text-stone-600 mb-6">Simplified regional tools for artisans.</p>
                            <ul className="space-y-2 text-sm text-stone-500">
                                <li>• Order Management Dashboard</li>
                                <li>• Measurement Templates</li>
                                <li>• Fabric Inventory Upload</li>
                                <li>• Automated Payout Wallet</li>
                            </ul>
                        </div>

                        {/* Admin/Trust Layer */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-stone-800 hover:shadow-2xl transition-shadow duration-300">
                            <div className="mb-6 text-stone-800 p-3 bg-stone-100 rounded-lg inline-block"><Shield size={32} /></div>
                            <h3 className="text-xl font-bold mb-4 font-serif text-stone-900">Trust & Quality Layer</h3>
                            <p className="text-sm text-stone-600 mb-6">The backbone of verify and operations.</p>
                            <ul className="space-y-2 text-sm text-stone-500">
                                <li>• Physical Verification System</li>
                                <li>• Quality Control (QC) Checkpoints</li>
                                <li>• Dispute Resolution Center</li>
                                <li>• Logistics Orchestration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Process (Existing Component) */}
            <HowItWorksSection />

            {/* 5. Key Innovations */}
            <section className="py-24 max-w-7xl mx-auto px-4 bg-rose-50/50 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-rose-100/30 -skew-x-12 -z-0 pointer-events-none"></div>

                <div className="text-center mb-20 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-950 mb-4">Beyond "Just Another App"</h2>
                    <p className="text-maroon-800/60">Four pillars of innovation that make remote bespoke tailoring possible.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    {/* Items */}
                    <div className="flex gap-6 group hover:translate-x-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-maroon-900 border border-rose-200 shadow-sm group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                            <Globe size={28} />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-2 text-maroon-950">Regional Craft Mapping Engine</h4>
                            <p className="text-stone-600 leading-relaxed">
                                We don't just list tailors; we map them to specific historical craft regions. A tailor is tagged with "Banarasi Silk" only if verified in that region.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 group hover:translate-x-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-maroon-900 border border-rose-200 shadow-sm group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                            <Brain size={28} />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-2 text-maroon-950">Smart Fit & Measurement Engine</h4>
                            <p className="text-stone-600 leading-relaxed">
                                Our system validates manual measurements against millions of data points to flag inconsistencies. Future updates will include AI-driven body scanning.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 group hover:translate-x-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-maroon-900 border border-rose-200 shadow-sm group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                            <Lock size={28} />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-2 text-maroon-950">Escrow + Quality Gate</h4>
                            <p className="text-stone-600 leading-relaxed">
                                Your money is safe. Payments are held in neutral escrow and released to the tailor only AFTER the garment passes our QC checks.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 group hover:translate-x-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-maroon-900 border border-rose-200 shadow-sm group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                            <RefreshCw size={28} />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-2 text-maroon-950">Reverse Logistics & Alterations</h4>
                            <p className="text-stone-600 leading-relaxed">
                                We handle the "what if". If a fit issue arises, our network supports local alteration partners or secure reverse shipping.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 6. Regulatory & Trust Footer */}
            <section className="bg-stone-900 text-stone-400 py-16 px-4 text-sm border-t border-stone-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-md">
                        <h4 className="text-ivory font-serif font-bold text-lg mb-4">Regulatory Compliance</h4>
                        <p className="mb-4">
                            BharatTailor Network operates in full compliance with Indian Consumer Protection guidelines.
                            All partner tailors are KYC-verified (Aadhaar/PAN) and onboarded as MSME entities where applicable.
                        </p>
                        <div className="flex gap-4">
                            <span className="bg-black/30 px-3 py-1 rounded border border-white/10 flex items-center gap-2"><Scale size={14} /> GST Compliant</span>
                            <span className="bg-black/30 px-3 py-1 rounded border border-white/10 flex items-center gap-2"><Shield size={14} /> MSME Verified</span>
                        </div>
                    </div>

                    <div className="max-w-md">
                        <h4 className="text-ivory font-serif font-bold text-lg mb-4">Our Commitment</h4>
                        <p className="italic text-stone-500">
                            “We are building India’s first national digital infrastructure for traditional and custom tailoring — connecting skilled regional artisans directly to customers nationwide with trust, logistics, and quality assurance.”
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HowItWorks;
