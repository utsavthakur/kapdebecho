import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { authService } from '../services/auth';
import toast from 'react-hot-toast';
import { Tailor } from '../types';
import { Product } from '../features/products/types';
import { Address, OrderStatus, PaymentStatus } from '../features/orders/types';
import { ordersService } from '../services/orders';
import { productsService } from '../services/products';
import Button from '../components/Button';
import AddressForm from '../components/AddressForm';
import UpiPaymentModal from '../components/UpiPaymentModal';
import {
  Star, MapPin, Scissors, Loader2, ShoppingBag, AlertCircle, User, ChevronLeft, Check
} from 'lucide-react';

const TailorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [tailor, setTailor] = useState<Tailor | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isTailorViewer, setIsTailorViewer] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState<string | null>(null);

  // Address + Notes state
  const [showOrderForm, setShowOrderForm] = useState<string | null>(null);
  const [address, setAddress] = useState<Address>({
    fullName: '', phone: '', city: '', state: '', pincode: '', line1: '', landmark: ''
  });
  const [notes, setNotes] = useState('');

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<{
    id: string;
    amount: number;
    productName: string;
    productImage: string;
    size: string;
    orderNumber: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;

        const { data: tailorData } = await supabase
          .from('tailors')
          .select('*')
          .eq('id', id)
          .single();

        if (tailorData) {
          setTailor({
            id,
            name: tailorData.name || 'Master Tailor',
            region: tailorData.region || 'India',
            specialization: tailorData.specialization || 'Custom Tailoring',
            experienceYears: tailorData.experience_years || 0,
            rating: tailorData.rating || 0,
            verified: tailorData.verified || false,
            imageUrl: tailorData.image_url || 'https://picsum.photos/400/400?random=1',
            startingPrice: 0,
            tags: tailorData.tags || ['Handcrafted'],
            location: tailorData.location || { lat: 20.5937, lng: 78.9629 },
            upiId: tailorData.upi_id || undefined,
          });
        }

        const items = await productsService.getAvailableByTailor(id);
        setProducts(items);
        const initialSizes: Record<string, string> = {};
        items.forEach(p => {
          if (p.sizes?.length) initialSizes[p.id] = p.sizes[0].size;
        });
        setSelectedSizes(initialSizes);

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('addresses')
            .eq('id', user.id)
            .single();
          const saved = profile?.addresses?.[0];
          if (saved) setAddress(saved);
        }
      } catch (err) {
        console.error('Error loading tailor:', err);
      } finally {
        setLoading(false);
      }
    };
    load();

    supabase.auth.getUser().then(async ({ data }) => {
      setCurrentUser(data.user);
      if (data.user) {
        const role = await authService.getCurrentUserRole();
        setIsTailorViewer(role === 'tailor');
      }
    });
  }, [id]);

  const handlePlaceOrder = async (product: Product) => {
    const size = selectedSizes[product.id];
    if (!size) return;

    const { data: { user: u } } = await supabase.auth.getUser();
    if (!u) {
      toast.error('Please sign in to place an order.');
      return;
    }

    if (!address.fullName || !address.phone || !address.city || !address.pincode || !address.line1) {
      toast.error('Please fill in your delivery address.');
      return;
    }

    const sizeData = product.sizes?.find(s => s.size === size);
    if (!sizeData) return;

    setPlacing(product.id);

    try {
      const { id: orderId, orderNumber } = await ordersService.create({
        tailorId: id!,
        productSnapshot: {
          name: product.name,
          image: product.images?.[0] || '',
          size,
          price: sizeData.price,
        },
        address,
        notes,
      });

      setShowOrderForm(null);
      setNotes('');

      if (tailor?.upiId) {
        setPendingOrder({
          id: orderId,
          amount: sizeData.price,
          productName: product.name,
          productImage: product.images?.[0] || '',
          size,
          orderNumber,
        });
        setShowPaymentModal(true);
      } else {
        toast.success(`Order placed for "${product.name}" (${size})!`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order.');
    } finally {
      setPlacing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader2 className="animate-spin text-maroon-900 h-10 w-10" />
      </div>
    );
  }

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <p className="text-stone-500">Tailor not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-ivory pb-20">
      {tailor && (
        <div className="bg-stone-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/discovery" className="inline-flex items-center text-stone-400 hover:text-white text-sm mb-6 transition-colors">
              <ChevronLeft size={16} className="mr-1" /> Back to Discovery
            </Link>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={tailor.imageUrl}
                alt={tailor.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover border-4 border-stone-800 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-serif font-bold">{tailor.name}</h1>
                  {tailor.verified && <span className="bg-gold-600 text-black text-xs px-2 py-0.5 rounded font-bold">VERIFIED</span>}
                </div>
                <div className="flex items-center text-stone-400 text-sm gap-2">
                  <MapPin size={14} /> {tailor.region} • {tailor.specialization}
                </div>
                <div className="flex items-center gap-1 mt-2 text-gold-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm">{tailor.rating}</span>
                </div>
                {tailor.experienceYears > 0 && (
                  <p className="text-stone-500 text-sm mt-1">{tailor.experienceYears} years of experience</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-6 flex items-center gap-2">
          <Scissors className="text-maroon-900" size={24} />
          Products & Services
        </h2>

        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
            <Scissors className="mx-auto text-stone-300 mb-4" size={48} />
            <p className="text-stone-500 text-lg mb-2">This tailor has no products yet.</p>
            <p className="text-stone-400 text-sm">Products will appear here once added.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => {
            const selSize = selectedSizes[product.id];
            const sizeData = product.sizes?.find(s => s.size === selSize);
            const isFormOpen = showOrderForm === product.id;

            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                {product.images?.[0] && (
                  <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-stone-100 text-maroon-900 rounded">{product.type}</span>
                  </div>
                  <p className="text-sm text-stone-600 mb-4 flex-grow">{product.description}</p>

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-4">
                      <label className="text-xs font-bold text-stone-500 uppercase block mb-2">Select Size</label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s, i) => {
                          const active = selSize === s.size;
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: s.size }))}
                              className={`px-3 py-1.5 text-sm rounded border transition-all ${active ? 'bg-maroon-900 text-white border-maroon-900' : 'bg-white text-stone-700 border-stone-300 hover:border-maroon-900'}`}
                            >
                              {s.size} — ₹{s.price}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {isFormOpen && (
                    <div className="mb-4 p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                      <AddressForm address={address} onChange={setAddress} />
                      <textarea placeholder="Order notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2 text-sm border border-stone-300 rounded" />
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-stone-100">
                    {isTailorViewer ? (
                      <div className="text-center py-4">
                        <p className="text-xs text-stone-500 mb-2">This is the customer storefront.</p>
                        <Link
                          to="/tailor/dashboard"
                          className="text-xs font-bold text-maroon-900 underline hover:text-maroon-700"
                        >
                          Go to your Dashboard →
                        </Link>
                      </div>
                    ) : (
                      <>
                        {sizeData && (
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-stone-500">Total</span>
                            <span className="text-xl font-bold text-maroon-900">₹{sizeData.price}</span>
                          </div>
                        )}

                        {!isFormOpen ? (
                          <Button
                            onClick={() => {
                              if (!currentUser) {
                                toast.error('Please sign in to place an order.');
                                return;
                              }
                              setShowOrderForm(product.id);
                            }}
                            className="w-full"
                          >
                            <ShoppingBag size={16} className="mr-2" /> Place Order
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              onClick={() => setShowOrderForm(null)}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handlePlaceOrder(product)}
                              disabled={placing === product.id}
                              className="flex-1"
                            >
                              {placing === product.id ? (
                                <><Loader2 className="animate-spin mr-2" size={16} /> Placing...</>
                              ) : 'Confirm Order'}
                            </Button>
                          </div>
                        )}

                        {!currentUser && (
                          <p className="text-xs text-stone-400 mt-2 text-center">
                            <Link to="/auth" className="text-maroon-900 underline">Sign in</Link> to place an order
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      {pendingOrder && tailor?.upiId && (
        <UpiPaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setPendingOrder(null);
          }}
          orderId={pendingOrder.id}
          amount={pendingOrder.amount}
          productName={pendingOrder.productName}
          productImage={pendingOrder.productImage}
          tailorUpiId={tailor.upiId}
          tailorName={tailor.name}
          size={pendingOrder.size}
          orderNumber={pendingOrder.orderNumber}
        />
      )}
    </div>
  );
};

export default TailorProfile;
