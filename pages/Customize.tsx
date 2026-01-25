import React, { useState } from 'react';
import Button from '../components/Button';
import { getStyleAdvice } from '../services/geminiService';
import { Sparkles, Loader, Ruler, Camera } from 'lucide-react';

const Customize: React.FC = () => {
  const [step, setStep] = useState(1);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [measurementMode, setMeasurementMode] = useState<'manual' | 'video'>('manual');

  const handleAiConsultation = async () => {
    if (!aiPrompt.trim()) return;
    setIsLoading(true);
    setAiResponse('');
    const advice = await getStyleAdvice(aiPrompt);
    setAiResponse(advice);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -z-10"></div>
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-maroon-900 text-white' : 'bg-stone-200 text-stone-500'}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8 min-h-[500px]">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">Step 1: Fabric & Style Consultation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Select Garment Type</label>
                <select className="w-full border border-stone-300 rounded p-3 mb-6 focus:ring-maroon-900">
                  <option>Men's Sherwani</option>
                  <option>Men's Kurta Pajama</option>
                  <option>Women's Blouse</option>
                  <option>Women's Salwar Kameez</option>
                  <option>3-Piece Suit</option>
                </select>

                <label className="block text-sm font-bold text-stone-700 mb-2">Fabric Source</label>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center p-3 border rounded cursor-pointer hover:border-maroon-900">
                    <input type="radio" name="fabric" className="text-maroon-900 focus:ring-maroon-900" defaultChecked />
                    <span className="ml-3">I will send my own fabric</span>
                  </div>
                  <div className="flex items-center p-3 border rounded cursor-pointer hover:border-maroon-900">
                    <input type="radio" name="fabric" className="text-maroon-900 focus:ring-maroon-900" />
                    <span className="ml-3">Purchase from Tailor's Inventory</span>
                  </div>
                </div>
              </div>

              {/* Gemini AI Section */}
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                <div className="flex items-center gap-2 mb-4 text-gold-600 font-serif font-bold">
                  <Sparkles size={18} /> AI Heritage Consultant
                </div>
                <p className="text-xs text-stone-500 mb-4">Not sure which fabric suits a Summer Wedding in Jaipur? Ask our AI.</p>
                
                <textarea 
                  className="w-full border border-stone-300 rounded p-3 text-sm h-24 mb-3 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="E.g., What fabric is best for a heavy Sherwani in humid weather?"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                
                <Button 
                  size="sm" 
                  onClick={handleAiConsultation} 
                  disabled={isLoading || !aiPrompt}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white"
                >
                  {isLoading ? <><Loader size={14} className="animate-spin mr-2"/> Consulting...</> : 'Get Advice'}
                </Button>

                {aiResponse && (
                  <div className="mt-4 p-3 bg-white border border-gold-200 rounded text-sm text-stone-700 italic leading-relaxed">
                    "{aiResponse}"
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep(2)}>Next: Measurements</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">Step 2: Smart Measurements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div 
                onClick={() => setMeasurementMode('manual')}
                className={`cursor-pointer p-6 rounded-lg border-2 flex flex-col items-center text-center transition-all ${measurementMode === 'manual' ? 'border-maroon-900 bg-maroon-50' : 'border-stone-200 hover:border-stone-300'}`}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Ruler className="text-maroon-900" />
                </div>
                <h3 className="font-bold mb-2">Manual Entry</h3>
                <p className="text-xs text-stone-500">Enter measurements using a tape measure. We provide a guide.</p>
              </div>

              <div 
                onClick={() => setMeasurementMode('video')}
                className={`cursor-pointer p-6 rounded-lg border-2 flex flex-col items-center text-center transition-all ${measurementMode === 'video' ? 'border-maroon-900 bg-maroon-50' : 'border-stone-200 hover:border-stone-300'}`}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Camera className="text-maroon-900" />
                </div>
                <h3 className="font-bold mb-2">AI Video Measure</h3>
                <p className="text-xs text-stone-500">Use your camera. Our Smart Engine calculates fit (Beta).</p>
              </div>
            </div>

            {measurementMode === 'manual' ? (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                 <div>
                   <label className="text-xs font-bold uppercase text-stone-500">Chest (in)</label>
                   <input type="number" className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="text-xs font-bold uppercase text-stone-500">Waist (in)</label>
                   <input type="number" className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="text-xs font-bold uppercase text-stone-500">Shoulder (in)</label>
                   <input type="number" className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="text-xs font-bold uppercase text-stone-500">Sleeve (in)</label>
                   <input type="number" className="w-full border p-2 rounded" />
                 </div>
              </div>
            ) : (
              <div className="bg-black text-white h-64 flex items-center justify-center rounded-lg">
                 <p className="text-center">Camera Feed Placeholder <br/> <span className="text-xs text-stone-400">Please stand 6ft away</span></p>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next: Review</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={40} />
             </div>
             <h2 className="text-3xl font-serif font-bold mb-4">Request Sent to Masterji</h2>
             <p className="text-stone-600 max-w-md mx-auto mb-8">
               Your customization request ID is <strong>#BTN-9921</strong>. The tailor will review your requirements and confirm the price within 4 hours.
             </p>
             <div className="flex justify-center gap-4">
               <Button onClick={() => window.location.hash = '/'}>Return Home</Button>
               <Button variant="outline">Track Request</Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customize;