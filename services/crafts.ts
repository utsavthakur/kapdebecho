import { supabase } from './supabase';
import { Craft } from '../types';

export const craftsService = {
    async getAll(): Promise<Craft[]> {
        const { data, error } = await (supabase
            .from('crafts')
            .select('*')
            .order('name', { ascending: true }) as any);

        if (error) {
            console.error('Error fetching crafts:', error);
            return [];
        }

        return (data || []).map(d => ({
            id: d.id,
            name: d.name,
            region: d.region,
            description: d.description || '',
            imageUrl: d.image_url || '',
        }));
    }
};
