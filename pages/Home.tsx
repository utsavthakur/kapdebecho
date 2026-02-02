import React from 'react';
import Hero from '../components/Hero';
import { REGIONAL_CRAFTS, MOCK_TAILORS } from '../constants';
import HowItWorksSection from '../components/HowItWorksSection';
import CinematicSpotlight from '../components/CinematicSpotlight';
import TailorCard from '../components/TailorCard';
import Button from '../components/Button';
import { ArrowRight, CheckCircle, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-ivory">
      <Hero />

      {/* Regional Craft Discovery */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Discover India's Heritage</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">Explore authentic craftsmanship from the heart of India's textile capitals. Sourced directly, stitched perfectly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REGIONAL_CRAFTS.map((craft) => (
            <div key={craft.id} className="group relative h-96 rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-500 shadow-md hover:shadow-2xl">
              <img
                src={craft.imageUrl}
                alt={craft.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-2">{craft.region}</p>
                <h3 className="text-2xl font-serif text-white font-bold mb-2">{craft.name}</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                  {craft.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/discovery">
            <Button variant="outline" className="gap-2">Explore All Regions <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </section>

      {/* Cinematic Spotlight: The Kanjeevaram Legacy */}
      <CinematicSpotlight />

      {/* Featured Tailors */}
      <section className="bg-stone-100 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-charcoal mb-2">Featured Master Tailors</h2>
              <p className="text-stone-500 text-sm">Top-rated artisans with verified heritage lineage.</p>
            </div>
            <Link to="/discovery" className="hidden md:block">
              <span className="text-maroon-900 font-bold text-sm hover:underline">View All Tailors</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_TAILORS.map(tailor => (
              <TailorCard key={tailor.id} tailor={tailor} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />
    </div>
  );
};

export default Home;