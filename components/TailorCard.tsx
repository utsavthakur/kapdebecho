import React from 'react';
import { Star, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Tailor } from '../types';
import Button from './Button';
import { Link } from 'react-router-dom';

interface TailorCardProps {
  tailor: Tailor;
}

const TailorCard: React.FC<TailorCardProps> = ({ tailor }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tailor.imageUrl} 
          alt={tailor.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {tailor.verified && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-maroon-900 text-xs font-bold px-3 py-1 rounded flex items-center gap-1 shadow-sm">
            <ShieldCheck size={12} fill="currentColor" /> VERIFIED
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
             <div className="flex items-center text-white gap-1 text-xs font-medium">
                <MapPin size={12} /> {tailor.region}
             </div>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-maroon-900 transition-colors">
            {tailor.name}
          </h3>
          <div className="flex items-center bg-stone-100 px-2 py-0.5 rounded">
            <Star size={12} className="text-gold-600 fill-current mr-1" />
            <span className="text-xs font-bold text-stone-800">{tailor.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-stone-500 mb-4 line-clamp-2">{tailor.specialization}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tailor.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider bg-stone-50 text-stone-600 px-2 py-1 rounded border border-stone-200">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-stone-100 pt-4 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">Starting From</span>
                <span className="text-sm font-bold text-maroon-900">₹{tailor.startingPrice.toLocaleString('en-IN')}</span>
            </div>
            <Link to={`/tailor/${tailor.id}`}>
              <Button size="sm" variant="secondary">View Profile</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TailorCard;