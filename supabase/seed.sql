-- Seed data for Tailors
INSERT INTO public.tailors (id, name, region, specialization, experience_years, rating, verified, image_url, starting_price, tags, location)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Masterji Rahmat Khan', 'Lucknow', 'Chikankari & Sherwanis', 35, 4.9, true, 'https://picsum.photos/400/400?random=1', 4500, ARRAY['Heritage Certified', 'Hand Stitching'], '{"lat": 26.8467, "lng": 80.9462, "address": "Chowk, Lucknow, Uttar Pradesh"}'),
  ('00000000-0000-0000-0000-000000000002', 'Savitri Devi', 'Kanchipuram', 'Silk Blouse & Saree Customization', 22, 4.8, true, 'https://picsum.photos/400/400?random=2', 1200, ARRAY['Silk Expert', 'Quick Delivery'], '{"lat": 12.8185, "lng": 79.6947, "address": "Gandhi Road, Kanchipuram, Tamil Nadu"}'),
  ('00000000-0000-0000-0000-000000000003', 'Royal Rajputana Tailors', 'Jaipur', 'Bandhgala & Jodhpuri Suits', 40, 5.0, true, 'https://picsum.photos/400/400?random=3', 8500, ARRAY['Royal Heritage', 'Gold Thread Work'], '{"lat": 26.9124, "lng": 75.7873, "address": "MI Road, Jaipur, Rajasthan"}')
ON CONFLICT (id) DO NOTHING;

-- Seed data for Crafts
INSERT INTO public.crafts (name, region, description, image_url)
VALUES 
  ('Banarasi Weaves', 'Varanasi', 'Ancient tradition of gold and silver brocade.', 'https://picsum.photos/600/400?random=10'),
  ('Lucknowi Chikankari', 'Lucknow', 'Intricate shadow work embroidery on fine muslin.', 'https://picsum.photos/600/400?random=11'),
  ('Kashmiri Pashmina', 'Kashmir', 'World-renowned soft wool and hand embroidery.', 'https://picsum.photos/600/400?random=12')
ON CONFLICT DO NOTHING;
