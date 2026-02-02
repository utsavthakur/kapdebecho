import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const CinematicSpotlight: React.FC = () => {
    return (
        <section className="relative bg-stone-900 text-white overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/assets/btn-0.4.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-stone-900/40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center min-h-[600px] py-20 lg:py-0">

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
                        <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <span className="h-px w-8 bg-gold-500"></span>
                            <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold">The Atelier Spotlight</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                            The Queen of <span className="text-gold-400 italic">Silks</span>.
                        </h2>

                        <p className="text-stone-300 text-lg md:text-xl font-light mb-8 max-w-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                            Born in Kanchipuram. Woven from pure mulberry silk and dipped in liquid gold. A Kanjeevaram isn't just a saree—it's an inheritance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 mb-10 text-sm text-stone-400 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                            <div>
                                <strong className="block text-white text-lg font-serif">400+</strong>
                                years of legacy
                            </div>
                            <div>
                                <strong className="block text-white text-lg font-serif">240</strong>
                                hours to weave
                            </div>
                            <div>
                                <strong className="block text-white text-lg font-serif">100%</strong>
                                pure zari
                            </div>
                        </div>

                        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                            <Link to="/discovery">
                                <button className="bg-white text-stone-900 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-white transition-all duration-300 flex items-center gap-3 group">
                                    Explore Kanjeevaram
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative group flex justify-center lg:justify-end">
                        <div className="relative z-10 cursor-zoom-in">
                            <img
                                src="/assets/garments/garment_kanjeevaram.png"
                                alt="Kanjeevaram Silk Saree"
                                className="w-full max-w-xl h-auto object-contain transform origin-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90 mix-blend-lighten"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CinematicSpotlight;
