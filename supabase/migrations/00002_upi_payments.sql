-- =====================
-- UPI PAYMENT SYSTEM
-- =====================

-- Add UPI ID to tailors
ALTER TABLE public.tailors ADD COLUMN IF NOT EXISTS upi_id TEXT;

-- Update orders table with payment fields
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'UPI';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_utr TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMPTZ;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_verified_by UUID REFERENCES public.profiles(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS upi_transaction_ref TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_notes TEXT;

-- Update status CHECK constraints
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check
  CHECK (status IN ('PENDING', 'PAYMENT_VERIFICATION', 'CONFIRMED', 'STITCHING', 'SHIPPED', 'DELIVERED'));

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_payment_status_check
  CHECK (payment_status IN ('PENDING', 'UTR_SUBMITTED', 'VERIFIED', 'FAILED', 'REFUNDED'));

-- RLS: tailors can verify payment on assigned orders
DROP POLICY IF EXISTS "Tailors can verify payment on assigned orders" ON public.orders;
CREATE POLICY "Tailors can verify payment on assigned orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = tailor_id)
  WITH CHECK (
    auth.uid() = tailor_id
    AND payment_status IN ('VERIFIED', 'FAILED')
    AND status IN ('PAYMENT_VERIFICATION', 'CONFIRMED')
  );
