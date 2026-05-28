-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- SEQUENCES
-- =====================
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- =====================
-- TABLES
-- =====================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('customer', 'tailor', 'admin')),
  addresses JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tailors
CREATE TABLE IF NOT EXISTS public.tailors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'tailor' CHECK (role IN ('tailor')),
  region TEXT,
  specialization TEXT,
  experience_years INTEGER DEFAULT 0,
  rating NUMERIC(3,1) DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  image_url TEXT,
  starting_price NUMERIC(10,2) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  location JSONB DEFAULT '{"lat": 20.5937, "lng": 78.9629}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services (products)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tailor_id UUID NOT NULL REFERENCES public.tailors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'Stitching' CHECK (type IN ('Stitching', 'Embroidery', 'Alteration & Repair', 'Readymade')),
  sizes JSONB DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL DEFAULT 'VA-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0'),
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  tailor_id UUID NOT NULL REFERENCES public.tailors(id),
  product_snapshot JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'STITCHING', 'SHIPPED', 'DELIVERED')),
  payment_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
  payment_id TEXT,
  address JSONB NOT NULL,
  notes TEXT DEFAULT '',
  estimated_delivery TIMESTAMPTZ,
  tracking_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crafts (Regional Crafts)
CREATE TABLE IF NOT EXISTS public.crafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX IF NOT EXISTS idx_services_tailor_id ON public.services(tailor_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_tailor_id ON public.orders(tailor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- =====================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =====================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );

  -- If role is 'tailor', also create tailor record
  IF NEW.raw_user_meta_data->>'role' = 'tailor' THEN
    INSERT INTO public.tailors (id, name, email, role)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'name', 'Master Tailor'),
      NEW.email,
      'tailor'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tailors (public-readable)
ALTER TABLE public.tailors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read tailors" ON public.tailors;
CREATE POLICY "Anyone can read tailors"
  ON public.tailors FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update own tailor profile" ON public.tailors;
CREATE POLICY "Users can update own tailor profile"
  ON public.tailors FOR UPDATE
  USING (auth.uid() = id);

-- Services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read available services" ON public.services;
CREATE POLICY "Anyone can read available services"
  ON public.services FOR SELECT
  USING (available = true OR auth.uid() IN (
    SELECT id FROM public.tailors WHERE id = auth.uid()
  ));

DROP POLICY IF EXISTS "Tailors can insert own services" ON public.services;
CREATE POLICY "Tailors can insert own services"
  ON public.services FOR INSERT
  WITH CHECK (auth.uid() = tailor_id);

DROP POLICY IF EXISTS "Tailors can update own services" ON public.services;
CREATE POLICY "Tailors can update own services"
  ON public.services FOR UPDATE
  USING (auth.uid() = tailor_id);

DROP POLICY IF EXISTS "Tailors can delete own services" ON public.services;
CREATE POLICY "Tailors can delete own services"
  ON public.services FOR DELETE
  USING (auth.uid() = tailor_id);

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Customers can read own orders" ON public.orders;
CREATE POLICY "Customers can read own orders"
  ON public.orders FOR SELECT
  USING (
    auth.uid() = customer_id
    OR
    auth.uid() = tailor_id
  );

DROP POLICY IF EXISTS "Customers can insert orders" ON public.orders;
CREATE POLICY "Customers can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Customers can update own orders" ON public.orders;
CREATE POLICY "Customers can update own orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Tailors can update assigned orders" ON public.orders;
CREATE POLICY "Tailors can update assigned orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = tailor_id);

-- Crafts
ALTER TABLE public.crafts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read crafts" ON public.crafts;
CREATE POLICY "Anyone can read crafts"
  ON public.crafts FOR SELECT
  USING (true);

-- =====================
-- STORAGE BUCKETS
-- =====================
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: authenticated users can upload to product-images/avatars under their own folder
DROP POLICY IF EXISTS "Users can upload product images" ON storage.objects;
CREATE POLICY "Users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Anyone can read product images" ON storage.objects;
CREATE POLICY "Anyone can read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('product-images', 'avatars'));

-- =====================
-- ENABLE REALTIME FOR ORDERS
-- =====================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
END $$;
