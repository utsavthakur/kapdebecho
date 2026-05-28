import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { productsService } from '../services/products';
import { Product } from '../features/products/types';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function TailorServicesList() {
  const [services, setServices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const items = await productsService.getByTailor(user.id);
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setServices(items);
    } catch (err: any) {
      console.error("Error fetching services:", err);
      setError('Could not load your catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleAvailability = async (id: string, current: boolean) => {
    try {
      await productsService.toggleAvailability(id, !current);
      setServices(prev => prev.map(p => p.id === id ? { ...p, available: !current } : p));
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-maroon-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-red-600 bg-red-50 p-4 rounded">
        <AlertCircle className="mr-2" />
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded border border-stone-200">
        <p className="text-stone-500">You haven't added any products yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold font-serif text-lg">Your Catalog ({services.length})</h3>
        <button onClick={fetchServices} className="text-sm text-maroon-900 hover:underline">Refresh</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-4 rounded shadow-sm border border-stone-200 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                {service.images?.[0] && (
                  <img src={service.images[0]} alt={service.name} className="w-12 h-12 rounded object-cover" />
                )}
                <div>
                  <h4 className="font-bold text-stone-900 leading-tight">{service.name}</h4>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-stone-100 text-maroon-900 rounded">
                    {service.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleAvailability(service.id, service.available)}
                className={`text-xs flex items-center gap-1 px-2 py-1 rounded ${service.available ? 'text-green-700 bg-green-50' : 'text-stone-400 bg-stone-100'}`}
                title={service.available ? 'Available — click to hide' : 'Hidden — click to show'}
              >
                {service.available ? <Eye size={14} /> : <EyeOff size={14} />}
                {service.available ? 'Active' : 'Hidden'}
              </button>
            </div>
            <p className="text-sm text-stone-600 mb-4 flex-grow line-clamp-2">{service.description}</p>
            <div className="mt-auto pt-3 border-t border-stone-100">
              <div className="flex flex-wrap gap-2">
                {service.sizes?.map((s, i) => (
                  <span key={i} className="text-xs bg-stone-50 px-2 py-1 rounded border border-stone-200">
                    {s.size}: <strong className="text-green-700">₹{s.price}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
