import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_TAILORS } from '../constants';
import Button from '../components/Button';
import { Star, MapPin, Award, Clock, Scissors, ChevronRight } from 'lucide-react';

const TailorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tailor = MOCK_TAILORS.find(t => t.id === id) || MOCK_TAILORS[0];

  return (
    <div className="bg-ivory pb-20">
      {/* Profile Header */}
      <div className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={tailor.imageUrl}
              alt={tailor.name}
              className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover border-4 border-stone-800 shadow-xl"
            />
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-serif font-bold">{tailor.name}</h1>
                {tailor.verified && <span className="bg-gold-600 text-black text-xs px-2 py-0.5 rounded font-bold">VERIFIED</span>}
              </div>
              <div className="flex items-center text-stone-400 mb-4 text-sm">
                <MapPin size={14} className="mr-1" /> {tailor.region} •
                <span className="mx-2 text-gold-500">{tailor.experienceYears} Years Experience</span>
              </div>
              <p className="text-stone-300 max-w-2xl mb-6 font-light">
                Specializing in {tailor.specialization}. A third-generation artisan keeping the legacy of royal stitching alive. Committed to precision and authentic material usage.
              </p>
              <div className="flex gap-4">
                <Link to="/customize">
                  <Button variant="secondary" size="lg">Start Custom Order</Button>
                </Link>
                <Button variant="outline" className="border-stone-600 text-stone-300 hover:text-white hover:bg-stone-800">Message</Button>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm min-w-[200px]">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-500 mb-1">{tailor.rating}</div>
                <div className="flex justify-center text-gold-500 mb-2">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="text-xs text-stone-400">based on 124 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Left Column: Details */}
            <div className="md:col-span-2 space-y-12">
              <section>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-2">
                  <Award className="text-maroon-900" /> Craft Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Sherwani Design', 'Hand Embroidery', 'Pattern Drafting', 'Silk Handling'].map(skill => (
                    <div key={skill} className="flex items-center gap-3 p-3 bg-stone-50 rounded border border-stone-100">
                      <Scissors size={18} className="text-stone-400" />
                      <span className="text-stone-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-6">Portfolio</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img src="https://picsum.photos/300/400?random=20" className="rounded hover:opacity-90 cursor-pointer" alt="Work sample" />
                  <img src="https://picsum.photos/300/400?random=21" className="rounded hover:opacity-90 cursor-pointer" alt="Work sample" />
                  <img src="https://picsum.photos/300/400?random=22" className="rounded hover:opacity-90 cursor-pointer" alt="Work sample" />
                </div>
              </section>
            </div>

            {/* Right Column: Pricing & Process */}
            <div className="space-y-8">
              <div className="bg-stone-50 p-6 rounded border border-stone-200">
                <h4 className="font-bold text-lg mb-4">Standard Rates</h4>
                <ul className="space-y-3 text-sm text-stone-600">
                  <li className="flex justify-between border-b border-stone-200 pb-2">
                    <span>Basic Stitching</span>
                    <span className="font-bold text-charcoal">₹{tailor.startingPrice}</span>
                  </li>
                  <li className="flex justify-between border-b border-stone-200 pb-2">
                    <span>Lining / Astar</span>
                    <span className="font-bold text-charcoal">+ ₹300</span>
                  </li>
                  <li className="flex justify-between border-b border-stone-200 pb-2">
                    <span>Embroidery (per hr)</span>
                    <span className="font-bold text-charcoal">₹800</span>
                  </li>
                </ul>
              </div>

              <div className="bg-maroon-50 p-6 rounded border border-maroon-100">
                <h4 className="font-bold text-lg text-maroon-900 mb-4 flex items-center gap-2">
                  <Clock size={18} /> Timeline
                </h4>
                <div className="relative border-l-2 border-maroon-200 ml-2 space-y-6">
                  <div className="ml-4">
                    <div className="absolute -left-[5px] w-3 h-3 bg-maroon-500 rounded-full mt-1.5"></div>
                    <p className="font-bold text-sm">Pickup / Measure</p>
                    <p className="text-xs text-stone-500">Day 1</p>
                  </div>
                  <div className="ml-4">
                    <div className="absolute -left-[5px] w-3 h-3 bg-maroon-300 rounded-full mt-1.5"></div>
                    <p className="font-bold text-sm">Stitching Phase</p>
                    <p className="text-xs text-stone-500">Day 2-6</p>
                  </div>
                  <div className="ml-4">
                    <div className="absolute -left-[5px] w-3 h-3 bg-maroon-300 rounded-full mt-1.5"></div>
                    <p className="font-bold text-sm">Delivery</p>
                    <p className="text-xs text-stone-500">Day 7</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;