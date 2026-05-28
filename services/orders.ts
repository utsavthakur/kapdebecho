import { supabase } from './supabase';
import { authService } from './auth';
import {
  OrderStatus, PaymentStatus, Order, Address, ProductSnapshot
} from '../features/orders/types';

interface CreateOrderInput {
  tailorId: string;
  productSnapshot: ProductSnapshot;
  address: Address;
  notes: string;
}

function mapOrder(data: any): Order {
  return {
    id: data.id,
    orderNumber: data.order_number || '',
    customerId: data.customer_id,
    tailorId: data.tailor_id,
    productSnapshot: data.product_snapshot || { name: '', image: '', size: '', price: 0 },
    status: data.status || OrderStatus.PENDING,
    paymentStatus: data.payment_status || PaymentStatus.PENDING,
    paymentId: data.payment_id || null,
    address: data.address || {},
    notes: data.notes || '',
    estimatedDelivery: data.estimated_delivery || null,
    trackingId: data.tracking_id || null,
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString(),
    paymentMethod: data.payment_method || 'UPI',
    paymentUtr: data.payment_utr || null,
    paymentVerifiedAt: data.payment_verified_at || null,
    paymentVerifiedBy: data.payment_verified_by || null,
    upiTransactionRef: data.upi_transaction_ref || null,
    paymentNotes: data.payment_notes || null,
  };
}

export const ordersService = {
  async create(input: CreateOrderInput): Promise<{ id: string; orderNumber: string }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const role = await authService.getCurrentUserRole();
    if (role !== 'customer') throw new Error('Only customers can place orders.');

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_id: user.id,
        tailor_id: input.tailorId,
        product_snapshot: input.productSnapshot,
        address: input.address,
        notes: input.notes || '',
        status: OrderStatus.PENDING,
        payment_status: PaymentStatus.PENDING,
        payment_method: 'UPI',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return { id: data.id, orderNumber: data.order_number || '' };
  },

  async submitPaymentProof(
    orderId: string,
    utr: string,
    notes?: string,
  ): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const role = await authService.getCurrentUserRole();
    if (role !== 'customer') throw new Error('Only customers can submit payment proof.');

    const updates: Record<string, any> = {
      payment_utr: utr,
      payment_status: PaymentStatus.UTR_SUBMITTED,
      status: OrderStatus.PAYMENT_VERIFICATION,
      payment_notes: notes || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);
    if (error) throw new Error(error.message);
  },

  async verifyPayment(
    orderId: string,
    verified: boolean,
  ): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const role = await authService.getCurrentUserRole();
    if (role !== 'tailor') throw new Error('Only tailors can verify payments.');

    if (verified) {
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: PaymentStatus.VERIFIED,
          status: OrderStatus.CONFIRMED,
          payment_verified_at: new Date().toISOString(),
          payment_verified_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: PaymentStatus.FAILED,
          status: OrderStatus.PENDING,
          payment_notes: 'Payment verification failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);
      if (error) throw new Error(error.message);
    }
  },

  async getCustomerOrders(): Promise<{ id: string; data: Order }[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []).map(d => ({ id: d.id, data: mapOrder(d) }));
  },

  subscribeCustomerOrders(
    callback: (orders: { id: string; data: Order }[]) => void,
  ): () => void {
    const channel = supabase.channel('orders-customer');

    const initialFetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        callback([]);
        return;
      }
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });
      callback((data || []).map(d => ({ id: d.id, data: mapOrder(d) })));
    };
    initialFetch();

    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => { initialFetch(); },
      )
      .subscribe();

    return () => { channel.unsubscribe(); };
  },

  async getTailorOrders(): Promise<{ id: string; data: Order }[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tailor_id', user.id)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []).map(d => ({ id: d.id, data: mapOrder(d) }));
  },

  subscribeTailorOrders(
    callback: (orders: { id: string; data: Order }[]) => void,
  ): () => void {
    const channel = supabase.channel('orders-tailor');

    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        callback([]);
        return;
      }
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('tailor_id', user.id)
        .order('created_at', { ascending: false });
      callback((data || []).map(d => ({ id: d.id, data: mapOrder(d) })));
    };
    fetchOrders();

    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => { fetchOrders(); },
      )
      .subscribe();

    return () => { channel.unsubscribe(); };
  },

  async updateStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const role = await authService.getCurrentUserRole();
    if (role !== 'tailor') throw new Error('Only tailors can update order status.');

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    if (error) throw new Error(error.message);
  },

  async updateDelivery(orderId: string, fields: { estimatedDelivery?: string; trackingId?: string }): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const role = await authService.getCurrentUserRole();
    if (role !== 'tailor') throw new Error('Only tailors can update delivery info.');

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (fields.estimatedDelivery) updates.estimated_delivery = fields.estimatedDelivery;
    if (fields.trackingId) updates.tracking_id = fields.trackingId;

    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);
    if (error) throw new Error(error.message);
  },
};
