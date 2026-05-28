import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Order, ORDER_STATUS_FLOW, STATUS_COLORS } from '../features/orders/types';
import { ordersService } from '../services/orders';
import Button from '../components/Button';
import AddServiceForm from '../components/AddServiceForm';
import TailorServicesList from '../components/TailorServicesList';
import toast from 'react-hot-toast';
import { Package, Loader2, LogOut, Shield, Check, X } from 'lucide-react';

const TailorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [checkingRole, setCheckingRole] = useState(true);
  const [orders, setOrders] = useState<{ id: string; data: Order }[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const role = await authService.getCurrentUserRole();
      if (role !== 'tailor') {
        await supabase.auth.signOut();
        navigate('/tailor/login', { replace: true });
        return;
      }
      setCheckingRole(false);

      const unsub = ordersService.subscribeTailorOrders((items) => {
        setOrders(items);
        setLoadingOrders(false);
      });
      return () => unsub();
    };
    check();
  }, [navigate]);

  if (checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader2 className="animate-spin text-maroon-900 h-10 w-10" />
      </div>
    );
  }

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      await ordersService.updateStatus(orderId, newStatus);
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handlePaymentVerify = async (orderId: string, verified: boolean) => {
    setVerifyingId(orderId);
    try {
      await ordersService.verifyPayment(orderId, verified);
      toast.success(verified ? 'Payment verified successfully!' : 'Payment rejected.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to process payment.');
    } finally {
      setVerifyingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getNextStatus = (current: Order['status']): Order['status'] | null => {
    const idx = ORDER_STATUS_FLOW.indexOf(current);
    return idx < ORDER_STATUS_FLOW.length - 1 ? ORDER_STATUS_FLOW[idx + 1] : null;
  };

  const pendingVerificationOrders = orders.filter(
    ({ data: o }) => o.status === 'PAYMENT_VERIFICATION' && o.paymentStatus === 'UTR_SUBMITTED'
  );
  const otherOrders = orders.filter(
    ({ data: o }) => !(o.status === 'PAYMENT_VERIFICATION' && o.paymentStatus === 'UTR_SUBMITTED')
  );

  return (
    <div className="bg-stone-100 min-h-screen pb-12">
      <div className="bg-maroon-900 text-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Partner Dashboard</h1>
            <p className="text-maroon-200 text-sm">Welcome back, Masterji</p>
          </div>
          <button onClick={handleLogout} className="flex items-center text-maroon-200 hover:text-white transition-colors">
            <LogOut size={20} className="mr-2" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 space-y-6 -mt-4">

        {/* Payment Verification Section */}
        {pendingVerificationOrders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-amber-200 overflow-hidden">
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-200 flex items-center gap-2">
              <Shield className="text-amber-600" size={20} />
              <h2 className="font-bold text-lg text-amber-900">Pending Payment Verification ({pendingVerificationOrders.length})</h2>
            </div>
            <div className="divide-y divide-stone-100">
              {pendingVerificationOrders.map(({ id, data: order }) => (
                <div key={id} className="p-6 bg-amber-50/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-stone-900 truncate">{order.productSnapshot?.name || 'Product'}</h3>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          UTR SUBMITTED
                        </span>
                      </div>
                      <p className="text-sm text-stone-500">
                        Size: <strong>{order.productSnapshot?.size}</strong> • ₹{order.productSnapshot?.price}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {order.orderNumber} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      {order.paymentUtr && (
                        <p className="text-xs text-stone-600 mt-2 font-mono bg-white inline-block px-2 py-1 rounded border border-stone-200">
                          UTR: {order.paymentUtr}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={verifyingId === id}
                        onClick={() => handlePaymentVerify(id, false)}
                      >
                        {verifyingId === id ? <Loader2 className="animate-spin" size={16} /> : <X size={16} className="mr-1" />}
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        disabled={verifyingId === id}
                        onClick={() => handlePaymentVerify(id, true)}
                      >
                        {verifyingId === id ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} className="mr-1" />}
                        Verify Payment
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center gap-2">
            <Package className="text-maroon-900" size={20} />
            <h2 className="font-bold text-lg">Incoming Orders ({otherOrders.length})</h2>
          </div>

          {loadingOrders ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-maroon-900 h-8 w-8" />
            </div>
          ) : otherOrders.length === 0 && pendingVerificationOrders.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Package size={48} className="mx-auto text-stone-300 mb-4" />
              <p>No orders yet. Share your profile link with customers!</p>
            </div>
          ) : otherOrders.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm">
              No other orders.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {otherOrders.map(({ id, data: order }) => {
                const next = getNextStatus(order.status);
                return (
                  <div key={id} className="p-6 hover:bg-stone-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-stone-900 truncate">{order.productSnapshot?.name || 'Product'}</h3>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-stone-100 text-stone-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-stone-500">
                          {order.customerName || order.customerId?.slice(0, 8)} • Size: <strong>{order.productSnapshot?.size}</strong> • ₹{order.productSnapshot?.price}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Ordered {new Date(order.createdAt).toLocaleDateString()} • {order.orderNumber}
                        </p>
                        {order.address && (
                          <p className="text-xs text-stone-400 mt-1">
                            Ship to: {order.address.city}, {order.address.state} • {order.address.phone}
                          </p>
                        )}
                        {order.notes && (
                          <p className="text-xs text-stone-400 mt-1 italic">"{order.notes}"</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {next && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(id, next!)}
                            className="whitespace-nowrap"
                          >
                            Mark {next}
                          </Button>
                        )}
                        {!next && (
                          <span className="text-xs text-green-600 font-medium">Delivered ✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded shadow-sm grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded border border-green-200 text-green-800">
            <Package size={32} className="mb-2" />
            <span className="font-bold">My Products</span>
          </button>
        </div>

        {/* Catalog Management */}
        <h2 className="font-bold text-stone-700 ml-1">Manage Your Catalog</h2>
        <AddServiceForm />
        <TailorServicesList />
      </div>
    </div>
  );
};

export default TailorDashboard;
