import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../services/supabase';
import { productsService } from '../services/products';
import ImageUpload from './ImageUpload';
import { Loader2, Plus, X } from 'lucide-react';

interface SizeEntry {
  size: string;
  price: string;
}

export default function AddServiceForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Stitching');
  const [sizes, setSizes] = useState<SizeEntry[]>([{ size: '', price: '' }]);
  const [available, setAvailable] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const addSizeRow = () => {
    setSizes([...sizes, { size: '', price: '' }]);
  };

  const removeSizeRow = (index: number) => {
    if (sizes.length === 1) return;
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: keyof SizeEntry, value: string) => {
    const updated = [...sizes];
    updated[index] = { ...updated[index], [field]: value };
    setSizes(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const validSizes = sizes.filter(s => s.size.trim() && s.price.trim());
    if (validSizes.length === 0) {
      setError('Add at least one size with a price.');
      setLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated. Please log in.');

      await productsService.add({
        tailorId: user.id,
        name,
        description,
        type,
        sizes: validSizes.map(s => ({ size: s.size.trim(), price: Number(s.price) })),
        images,
        available,
      });

      setSuccess('Product added successfully!');
      toast.success('Product added!');
      setName('');
      setDescription('');
      setType('Stitching');
      setSizes([{ size: '', price: '' }]);
      setImages([]);
      setAvailable(true);
    } catch (err: any) {
      setError(err.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
      <h3 className="text-lg font-serif font-bold mb-4 flex items-center">
        <Plus className="mr-2 h-5 w-5 text-maroon-900" />
        Add New Product
      </h3>

      {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">{success}</div>}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bridal Lehenga"
              className="w-full p-2 border border-stone-300 rounded focus:ring-maroon-900 focus:border-maroon-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded focus:ring-maroon-900 focus:border-maroon-900"
            >
              <option value="Stitching">Stitching</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Alteration">Alteration & Repair</option>
              <option value="Readymade">Readymade</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the product, materials used, turnaround time..."
            rows={3}
            className="w-full p-2 border border-stone-300 rounded focus:ring-maroon-900 focus:border-maroon-900"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-stone-700">Sizes & Pricing</label>
            <button
              type="button"
              onClick={addSizeRow}
              className="text-xs text-maroon-900 font-medium hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Add Size
            </button>
          </div>
          <div className="space-y-2">
            {sizes.map((entry, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="e.g. M, L, XL, 42"
                  value={entry.size}
                  onChange={(e) => updateSize(index, 'size', e.target.value)}
                  className="w-32 p-2 border border-stone-300 rounded focus:ring-maroon-900 focus:border-maroon-900"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Price"
                    value={entry.price}
                    onChange={(e) => updateSize(index, 'price', e.target.value)}
                    className="w-32 pl-7 p-2 border border-stone-300 rounded focus:ring-maroon-900 focus:border-maroon-900"
                  />
                </div>
                {sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <ImageUpload images={images} onImagesChange={setImages} />

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-stone-700">Available for orders</label>
          <button
            type="button"
            onClick={() => setAvailable(!available)}
            className={`relative w-12 h-6 rounded-full transition-colors ${available ? 'bg-green-600' : 'bg-stone-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${available ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-maroon-900 hover:bg-maroon-800 text-white px-6 py-2.5 rounded font-medium transition-colors flex items-center disabled:opacity-50"
        >
          {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          Save Product
        </button>
      </form>
    </div>
  );
}
