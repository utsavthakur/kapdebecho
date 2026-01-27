import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videos = ["/assets/hero-bg.mp4", "/assets/btn-2.mp4", "/assets/btn-3.mp4"];
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  React.useEffect(() => {
    // Ensure the new active video plays
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(e => console.log("Play error:", e));
    }
  }, [activeIndex]);

  return (
    <div className="relative bg-stone-900 overflow-hidden min-h-[650px] flex items-center">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {videos.map((src, index) => (
          <video
            key={src}
            ref={el => videoRefs.current[index] = el}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            autoPlay={index === 0} // Autoplay only the first one initially
            muted
            playsInline
            src={src}
            onEnded={() => {
              if (index === activeIndex) {
                setActiveIndex((prev) => (prev + 1) % videos.length);
              }
            }}
          />
        ))}

        <img
          className="w-full h-full object-cover opacity-40 animate-ken-burns origin-center absolute inset-0 z-20"
          src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop"
          alt="Tailor hands working on fabric"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-900/30 z-30"></div>
        {/* Fine texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] z-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full">
        <div className="lg:w-3/4 relative">



          <div className="inline-flex items-center px-4 py-1.5 rounded border border-gold-600/40 bg-black/40 backdrop-blur-sm text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-fade-in-up shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            India's First National Tailoring Grid
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 animate-fade-in-up [animation-delay:200ms] opacity-0 fill-mode-forwards drop-shadow-lg">
            Access India’s Finest <br />
            <span className="text-shimmer italic pr-2">Regional Master Tailors</span> <br />
            From Anywhere.
          </h1>

          <p className="text-xl text-stone-200 mb-12 max-w-2xl font-light leading-relaxed animate-fade-in-up [animation-delay:400ms] opacity-0 fill-mode-forwards drop-shadow-md border-l-2 border-gold-600 pl-6">
            Experience the luxury of true custom fit. Verified heritage craftsmanship from Lucknow, Jaipur, and Banaras — delivered to your doorstep with escrow protection.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
            <Link to="/discovery">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 text-base px-10 shadow-gold-900/20">
                Find a Master Tailor
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 text-base px-10 border-stone-400 text-stone-200 hover:bg-white hover:text-stone-900 hover:border-white transition-all">
                How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-8 text-stone-400 text-sm animate-fade-in-up [animation-delay:800ms] opacity-0 fill-mode-forwards">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded backdrop-blur-sm border border-white/5">
              <span className="text-gold-500 font-bold">1,200+</span> Verified Masterjis
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded backdrop-blur-sm border border-white/5">
              <span className="text-gold-500 font-bold">100%</span> Fit Guarantee
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Hero;