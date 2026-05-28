import { supabase } from './supabase';
import { Address } from '../features/orders/types';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'tailor' | 'admin';
  addresses: Address[];
  createdAt: string;
}

function mapProfile(data: any): UserProfile {
  return {
    uid: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    role: data.role,
    addresses: data.addresses || [],
    createdAt: data.created_at || new Date().toISOString(),
  };
}

export const authService = {
  async registerTailor(email: string, password: string, name: string, phone: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'tailor' },
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Registration failed');

    // The DB trigger (handle_new_user) creates profiles and tailors rows.
    // But if the profile isn't created immediately (email confirmation),
    // we upsert to be safe.
    await supabase.from('profiles').upsert({
      id: data.user.id,
      name,
      email,
      phone,
      role: 'tailor',
    });

    await supabase.from('tailors').upsert({
      id: data.user.id,
      name,
      email,
      phone,
      role: 'tailor',
    });

    return data.user;
  },

  async registerCustomer(email: string, password: string, name: string, phone: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'customer' },
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Registration failed');

    await supabase.from('profiles').upsert({
      id: data.user.id,
      name,
      email,
      phone,
      role: 'customer',
    });

    return data.user;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async loginAsCustomer(email: string, password: string) {
    const data = await this.login(email, password);
    if (!data.user) throw new Error('Login failed');

    const profile = await this.getUserProfile(data.user.id);
    if (!profile) {
      await supabase.auth.signOut();
      throw new Error('Profile not found. Please register first.');
    }
    if (profile.role !== 'customer') {
      await supabase.auth.signOut();
      throw new Error('This email is registered as a tailor. Please use the Partner login.');
    }
    return data;
  },

  async loginAsTailor(email: string, password: string) {
    const data = await this.login(email, password);
    if (!data.user) throw new Error('Login failed');

    const profile = await this.getUserProfile(data.user.id);
    if (!profile) {
      await supabase.auth.signOut();
      throw new Error('Profile not found. Please register first.');
    }
    if (profile.role !== 'tailor') {
      await supabase.auth.signOut();
      throw new Error('This email is registered as a customer. Please use the Customer login.');
    }
    return data;
  },

  async getCurrentUserRole(): Promise<'customer' | 'tailor' | 'admin' | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const profile = await this.getUserProfile(user.id);
    return profile?.role || null;
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();
    if (error || !data) return null;
    return mapProfile(data);
  },

  async saveAddress(uid: string, address: Address): Promise<void> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('addresses')
      .eq('id', uid)
      .single();

    const addresses = [...(profile?.addresses || []), address];
    await supabase.from('profiles').update({ addresses }).eq('id', uid);
  },
};
