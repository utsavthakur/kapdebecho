import React from 'react';
import { MapPin, Info, ArrowRight } from 'lucide-react';

interface HeritageCraft {
    state: string;
    craft: string;
    description: string;
    imagePath: string;
    popularCities: string[];
}

const HERITAGE_DATA: HeritageCraft[] = [
    {
        state: "Uttar Pradesh",
        craft: "Chikankari",
        description: "The delicate art of 'shadow work' embroidery, traditionally done with white thread on fine muslin.",
        imagePath: "/assets/textures/chikankari.png",
        popularCities: ["Lucknow"]
    },
    {
        state: "Gujarat",
        craft: "Bandhani & Patola",
        description: "Vibrant tie-dye techniques and double-ikat weaves known for geometric precision.",
        imagePath: "/assets/textures/bandhani.png",
        popularCities: ["Ahmedabad", "Bhuj", "Patan"]
    },
    {
        state: "Tamil Nadu",
        craft: "Kanjeevaram Silk",
        description: "Heavy silk sarees with rich gold borders, originating from the temple town of Kanchipuram.",
        imagePath: "/assets/textures/kanjeevaram.png",
        popularCities: ["Kanchipuram", "Chennai"]
    },
    {
        state: "West Bengal",
        craft: "Jamdani & Kantha",
        description: "Fine muslin with woven motifs (Jamdani) and running stitch embroidery (Kantha).",
        imagePath: "/assets/textures/chikankari.png", // Using chikankari as placeholder/fallback
        popularCities: ["Kolkata", "Shantiniketan"]
    },
    {
        state: "Punjab",
        craft: "Phulkari",
        description: "Literal 'flower working', a geometric embroidery technique using bright floss silk threads.",
        imagePath: "/assets/textures/phulkari.png",
        popularCities: ["Amritsar", "Patiala"]
    },
    {
        state: "Jammu & Kashmir",
        craft: "Pashmina & Kashida",
        description: "Luxurious fine wool shawls and nature-inspired intricate needlework.",
        imagePath: "/assets/textures/kanjeevaram.png", // Using silk texture as placeholder
        popularCities: ["Srinagar"]
    },
    {
        state: "Rajasthan",
        craft: "Block Print & Leheriya",
        description: "Famous for vegetable dye hand-block printing (Bagru/Sanganer) and wave-pattern tie-dye.",
        imagePath: "/assets/textures/leheriya.png",
        popularCities: ["Jaipur", "Jodhpur"]
    },
    {
        state: "Maharashtra",
        craft: "Paithani",
        description: "Luxurious silk sarees characterized by borders of oblique square design and a peacock pallu.",
        imagePath: "/assets/textures/phulkari.png", // Using phulkari as placeholder
        popularCities: ["Aurangabad", "Yeola"]
    }
];

const HeritageList: React.FC = () => {
    return (
        <div className="h-full w-full overflow-y-auto bg-stone-50 p-4 md:p-6 scrollbar-hide">
            <div className="mb-8">
                <h2 className="font-serif text-3xl text-maroon-900 mb-2 font-bold">Heritage Textile Map</h2>
                <p className="text-stone-600 max-w-2xl">Explore the rich tapestry of Indian craftsmanship. Each region boasts unique techniques passed down through generations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HERITAGE_DATA.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col cursor-default"
                    >
                        {/* Real Texture Header - Increased Height */}
                        <div className="h-40 relative overflow-hidden group-hover:h-44 transition-all duration-500">
                            {/* Texture Image with slow zoom effect */}
                            <img
                                src={item.imagePath}
                                alt={`${item.craft} texture`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 origin-center"
                            />

                            {/* Overlay Gradient for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>

                            <div className="absolute bottom-4 left-5 right-5">
                                <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-maroon-900 uppercase shadow-sm mb-2 inline-block border border-stone-200">
                                    {item.state}
                                </span>
                                <h3 className="font-serif font-bold text-3xl text-white drop-shadow-md">
                                    {item.craft}
                                </h3>
                            </div>
                        </div>

                        <div className="p-5 flex-grow flex flex-col">
                            <p className="text-stone-500 text-sm mb-5 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between text-xs pt-2 border-t border-dashed border-stone-200">
                                <div className="flex items-center text-stone-500">
                                    <MapPin size={12} className="mr-1.5 text-maroon-900/70" />
                                    <span>{item.popularCities.join(", ")}</span>
                                </div>
                                <div className="text-maroon-900 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                    Explore Makers <ArrowRight size={12} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm text-xs text-stone-400">
                    <Info size={14} />
                    <span>More regions and crafts coming soon</span>
                </div>
            </div>
        </div>
    );
};

export default HeritageList;
