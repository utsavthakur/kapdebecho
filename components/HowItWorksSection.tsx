import React from 'react';
import { Map, Ruler, ShieldCheck, Truck, CheckCircle, Scroll } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            id: 1,
            title: "Discover Verified Regional Tailors",
            description: "Browse India’s finest master tailors by region and craft — Banaras, Jaipur, Lucknow, Kanchipuram, Kashmir — all verified for authenticity, experience, and craftsmanship.",
            icon: Map,
            badges: ["Craft Verified", "Regional Authenticity"]
        },
        {
            id: 2,
            title: "Customize Your Garment & Fit",
            description: "Select fabrics, styles, and provide measurements using our guided system. Save your body profile for future orders and reduce fit risk with intelligent validation.",
            icon: Ruler,
            badges: ["Guided Measurements", "Fit Confidence Indicator"]
        },
        {
            id: 3,
            title: "Crafted & Quality Checked",
            description: "Your garment is stitched by your selected master tailor and passes through BharatTailor quality checkpoints to ensure craftsmanship, finish, and specifications meet platform standards.",
            icon: ShieldCheck,
            badges: ["Platform QC", "Craft Standards Enforced"]
        },
        {
            id: 4,
            title: "Delivered with Fit Protection",
            description: "Payments are held securely in escrow. Funds are released only after you approve fit and quality — with alteration or reverse logistics support if required.",
            icon: Truck,
            badges: ["Escrow Protected", "Alteration Support"]
        }
    ];

    const trustBadges = [
        "Verified Master Tailors",
        "Authentic Craft Certification",
        "Escrow Protected Payments",
        "Platform Quality Control",
        "Alteration & Dispute Support"
    ];

    return (
        <section className="relative py-24 bg-ivory text-charcoal overflow-hidden font-sans">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none"></div>

            {/* Top Divider Shadow */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

            {/* Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block w-16 h-1 bg-gold-500 mb-6"></div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
                        How BharatTailor Network Works
                    </h2>
                    <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
                        From India’s master tailors to your doorstep — with trust, fit, and authenticity built in.
                    </p>
                    <div className="mt-8 border-b border-gold-600/30 w-full max-w-xs mx-auto"></div>
                </div>

                {/* 4-Step Pipeline */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative mb-24">
                    {/* Desktop Connector Line - Antique Gold */}
                    <div className="hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-0.5 bg-gold-400/30 -z-10"></div>

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="relative group animate-fade-in-up md:opacity-0 fill-mode-forwards"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Card */}
                            <div className="bg-ivory border border-gold-600/20 rounded-2xl p-8 h-full shadow-[0_4px_20px_-4px_rgba(28,25,23,0.05)] hover:shadow-[0_10px_30px_-4px_rgba(28,25,23,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col hover:-translate-y-1">
                                {/* Watermark Number */}
                                <div className="absolute -right-4 -top-6 text-9xl font-serif font-bold text-stone-900/10 select-none pointer-events-none">
                                    {step.id}
                                </div>

                                {/* Icon */}
                                <div className="mb-6 relative">
                                    <div className="w-14 h-14 rounded-full bg-[#fcfbf7] border border-gold-900/20 flex items-center justify-center text-maroon-900 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                                        <step.icon size={28} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-serif font-bold text-stone-900 mb-4 min-h-[56px] flex items-end">
                                    {step.title}
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow font-light">
                                    {step.description}
                                </p>

                                {/* Trust Micro-badges */}
                                <div className="mt-auto space-y-2 border-t border-gold-900/10 pt-4">
                                    {step.badges.map((badge, idx) => (
                                        <div key={idx} className="flex items-center text-xs font-medium text-stone-500">
                                            <CheckCircle size={12} className="text-gold-600 mr-2 flex-shrink-0" />
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Strip */}
                <div className="bg-stone-100 border border-stone-200 rounded-xl p-8 lg:px-12">
                    <h4 className="text-center font-serif text-charcoal/80 text-sm uppercase tracking-widest mb-8">
                        Why Customers Trust BharatTailor Network
                    </h4>
                    <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
                        {trustBadges.map((trust, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                                <span className="text-stone-700 font-medium text-sm md:text-base">{trust}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Microcopy */}
                <div className="text-center mt-12 max-w-2xl mx-auto">
                    <p className="text-sm text-stone-400 italic font-serif">
                        “Distance should never compromise authenticity, fit, or trust. BharatTailor Network brings India’s finest craftsmanship directly to you — with platform-backed protection.”
                    </p>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
