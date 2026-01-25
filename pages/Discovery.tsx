import React, { useState } from 'react';
import { MOCK_TAILORS } from '../constants';
import TailorCard from '../components/TailorCard';
import { Filter, SlidersHorizontal } from 'lucide-react';
import Button from '../components/Button';

const Discovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // In a real app, this would filter based on state
  const filteredTailors = MOCK_TAILORS.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">Find a Master Tailor</h1>
            <p className="text-stone-500">Browse verified artisans from across India's heritage regions.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search by name, city, or style..."
                className="w-full pl-4 pr-10 py-2.5 border border-stone-300 rounded focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal size={18} /> Filters
            </Button>
          </div>
        </div>

        {/* Filters Bar (Visual Only) */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-2 no-scrollbar">
          <button className="px-4 py-1.5 rounded-full bg-maroon-900 text-white text-sm whitespace-nowrap">All Regions</button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Lucknow</button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Jaipur</button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Kanchipuram</button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Verified Only</button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Wedding Specialist</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTailors.map(tailor => (
            <TailorCard key={tailor.id} tailor={tailor} />
          ))}
          {/* Duplicating for UI fullness */}
          {filteredTailors.map(tailor => (
            <TailorCard key={`${tailor.id}-dup`} tailor={{ ...tailor, id: `${tailor.id}-dup` }} />
          ))}
        </div>

        {filteredTailors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500">No tailors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;