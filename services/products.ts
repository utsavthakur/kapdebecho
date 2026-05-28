import { supabase } from './supabase';
import { authService } from './auth';
import { Product } from '../features/products/types';

function mapProduct(data: any): Product {
  return {
    id: data.id,
    tailorId: data.tailor_id,
    name: data.name,
    description: data.description || '',
    type: data.type || 'Stitching',
    sizes: data.sizes || [],
    images: data.images || [],
    available: data.available !== false,
    createdAt: data.created_at || new Date().toISOString(),
  };
}

export const productsService = {
  async getByTailor(tailorId: string): Promise<Product[]> {
    if (!tailorId) return [];

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('tailor_id', tailorId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []).map(mapProduct);
  },

  async getAvailableByTailor(tailorId: string): Promise<Product[]> {
    const all = await this.getByTailor(tailorId);
    return all.filter(p => p.available !== false);
  },

  async add(input: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const role = await authService.getCurrentUserRole();
    if (role !== 'tailor') throw new Error('Only tailors can add products.');
    if (input.tailorId !== user.id) throw new Error('You can only add products to your own catalog.');

    const { data, error } = await supabase
      .from('services')
      .insert({
        tailor_id: input.tailorId,
        name: input.name,
        description: input.description,
        type: input.type,
        sizes: input.sizes,
        images: input.images,
        available: input.available,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  },

  async update(productId: string, input: Partial<Product>): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const role = await authService.getCurrentUserRole();
    if (role !== 'tailor') throw new Error('Only tailors can update products.');

    const updates: Record<string, any> = {};
    if (input.name !== undefined) updates.name = input.name;
    if (input.description !== undefined) updates.description = input.description;
    if (input.type !== undefined) updates.type = input.type;
    if (input.sizes !== undefined) updates.sizes = input.sizes;
    if (input.images !== undefined) updates.images = input.images;
    if (input.available !== undefined) updates.available = input.available;

    const { error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', productId);
    if (error) throw new Error(error.message);
  },

  async toggleAvailability(productId: string, available: boolean): Promise<void> {
    await this.update(productId, { available } as Partial<Product>);
  },
};
