import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { authService } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Order, ORDER_STATUS_FLOW, STATUS_COLORS } from '../features/orders/types';
import { ordersService } from '../services/orders';
import { Package, Loader2, User, ArrowRight, Scissors } from 'lucide-react';

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<{ id: string; data: Order }[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isTailor, setIsTailor] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const init = async () => {
      const role = await authService.getCurrentUserRole();
      if (role === 'tailor') {
        setIsTailor(true);
        setCheckingRole(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        setCheckingRole(false);
        const unsub = ordersService.subscribeCustomerOrders((items) => {
          setOrders(items);
          setLoading(false);
        });
        return () => unsub();
      } else {
        setLoading(false);
        setCheckingRole(false);
      }
    };
    init();
  }, []);

  if (checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader2 className="animate-spin text-maroon-900 h-10 w-10" />
      </div>
    );
  }

  if (isTailor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center max-w-md mx-auto p-8">
          <Scissors size={48} className="mx-auto text-stone-300 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Partner Portal</h2>
          <p className="text-stone-500 mb-6">This page is for customers only. Head to your Partner Dashboard to manage orders.</p>
          <button
            onClick={() => navigate('/tailor/dashboard')}
            className="inline-flex items-center gap-2 bg-maroon-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-maroon-800 transition-colors"
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center max-w-md mx-auto p-8">
          <User size={48} className="mx-auto text-stone-300 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Sign in to View Orders</h2>
          <p className="text-stone-500 mb-6">Please log in to track your custom orders.</p>
          <Link to="/auth" className="inline-flex items-center gap-2 bg-maroon-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-maroon-800 transition-colors">
            Sign In <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-charcoal mb-8 flex items-center gap-3">
        <Package className="text-maroon-900" size={32} />
        My Orders
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-maroon-900 h-10 w-10" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
          <Package size={64} className="mx-auto text-stone-300 mb-6" />
          <h2 className="text-xl font-serif font-bold text-charcoal mb-2">No orders yet</h2>
          <p className="text-stone-500 mb-6">Browse tailors and place your first custom order!</p>
          <Link to="/discovery" className="inline-flex items-center gap-2 bg-maroon-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-maroon-800 transition-colors">
            Find a Tailor <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(({ id, data: order }) => {
            const currentIdx = ORDER_STATUS_FLOW.indexOf(order.status);
            return (
              <div key={id} className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-stone-900">{order.productSnapshot?.name || 'Product'}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-stone-100 text-stone-700'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500">
                      Size: <strong>{order.productSnapshot?.size}</strong> • ₹{order.productSnapshot?.price}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Ordered {new Date(order.createdAt).toLocaleDateString()} • {order.orderNumber}
                    </p>
                    {order.estimatedDelivery && (
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                    {order.trackingId && (
                      <p className="text-xs text-maroon-900 mt-0.5">Tracking: {order.trackingId}</p>
                    )}
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mt-6 flex items-center gap-1">
                  {ORDER_STATUS_FLOW.map((step, idx) => (
                    <React.Fragment key={step}>
                      <div className={`flex items-center gap-2 ${idx <= currentIdx ? 'text-maroon-900' : 'text-stone-300'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx <= currentIdx ? 'bg-maroon-900 text-white' : 'bg-stone-200 text-stone-400'}`}>
                          {idx + 1}
                        </div>
                        <span className="text-xs font-medium capitalize hidden sm:inline">{step.toLowerCase()}</span>
                      </div>
                      {idx < ORDER_STATUS_FLOW.length - 1 && (
                        <div className={`flex-1 h-0.5 ${idx < currentIdx ? 'bg-maroon-900' : 'bg-stone-200'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
