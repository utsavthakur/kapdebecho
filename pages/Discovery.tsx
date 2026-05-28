import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import TailorCard from '../components/TailorCard';
import HeritageList from '../components/HeritageList';
import { Tailor } from '../types';
import { Filter, SlidersHorizontal, Map as MapIcon, List as ListIcon, Loader2 } from 'lucide-react';
import Button from '../components/Button';

const Discovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [realTailors, setRealTailors] = useState<Tailor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTailorId, setSelectedTailorId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const { data, error } = await supabase
          .from('tailors')
          .select('*') as { data: any[] | null, error: any };

        if (error) throw error;

        const tailors = (data || []).map(d => ({
          id: d.id,
          name: d.name || 'Master Tailor',
          region: d.region || 'India',
          specialization: d.specialization || 'Custom Tailoring',
          experienceYears: d.experience_years || 0,
          rating: d.rating || 0,
          verified: d.verified || false,
          imageUrl: d.image_url || `https://picsum.photos/seed/${d.id}/400/400`,
          startingPrice: d.starting_price || 0,
          tags: d.tags || ['Handcrafted'],
          location: d.location || { lat: 20.5937, lng: 78.9629 },
        } as Tailor));
        setRealTailors(tailors);
      } catch (err) {
        console.error('Error fetching tailors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTailors();
  }, []);

  const allTailors = realTailors;

  const filteredTailors = allTailors.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTailorSelect = (id: string) => {
    setSelectedTailorId(id);
    const element = document.getElementById(`tailor-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-stone-50 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      {/* Search Header - Fixed at top */}
      <div className="bg-white border-b border-stone-200 z-10 px-4 sm:px-6 lg:px-8 py-4 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Mobile View Toggle */}
          <div className="flex md:hidden w-full bg-stone-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-maroon-900' : 'text-stone-500'}`}
            >
              <ListIcon size={16} className="mr-2" /> Tailors
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow text-maroon-900' : 'text-stone-500'}`}
            >
              <MapIcon size={16} className="mr-2" /> Crafts
            </button>
          </div>

          <div className="relative flex-grow w-full md:w-96">
            <input
              type="text"
              placeholder="Search by name, city, or style..."
              className="w-full pl-4 pr-10 py-2.5 border border-stone-300 rounded focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <SlidersHorizontal size={18} /> Filters
            </Button>
            <button className="px-4 py-1.5 rounded-full bg-maroon-900 text-white text-sm whitespace-nowrap">All Regions</button>
            <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Lucknow</button>
            <button className="px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-maroon-900 text-sm whitespace-nowrap">Jaipur</button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Heritage List Side (Left) */}
        <div className={`w-full md:w-3/5 lg:w-2/3 h-full transition-all duration-300 p-4 ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
          <HeritageList />
        </div>

        {/* Tailor List Side (Right) */}
        <div className={`w-full md:w-2/5 lg:w-1/3 h-full bg-stone-50 overflow-y-auto border-l border-stone-200 ${viewMode === 'map' ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-stone-500 font-medium text-sm">{filteredTailors.length} Tailors Found</h2>
              <span className="text-xs text-stone-400">Showing top results</span>
            </div>

            {filteredTailors.map(tailor => (
              <div
                key={tailor.id}
                id={`tailor-card-${tailor.id}`}
                className={`transition-all duration-300 ${selectedTailorId === tailor.id ? 'ring-2 ring-maroon-900 rounded-lg transform scale-[1.02]' : ''}`}
                onClick={() => {
                  setSelectedTailorId(tailor.id);
                  if (window.innerWidth < 768) {
                  }
                }}
              >
                <TailorCard tailor={tailor} />
              </div>
            ))}

            {loading && (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-maroon-900 h-8 w-8" />
              </div>
            )}

            {!loading && filteredTailors.length === 0 && (
              <div className="text-center py-20">
                <p className="text-stone-500">No tailors found matching your criteria.</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gold-50 border border-gold-200 rounded-lg text-xs text-gold-800">
              <p className="font-bold mb-1">Authenticity Guaranteed</p>
              All tailors listed are verified for heritage craftsmanship techniques.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discovery;
