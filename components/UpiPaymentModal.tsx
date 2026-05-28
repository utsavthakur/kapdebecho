import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCode } from 'react-qr-code';
import { generateUpiLink } from '../utils/generateUpiLink';
import { ordersService } from '../services/orders';
import {
  X, Copy, Check, ExternalLink, Smartphone, QrCode,
  Loader2, ChevronRight, IndianRupee, Package, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  amount: number;
  productName: string;
  productImage?: string;
  tailorUpiId: string;
  tailorName: string;
  size: string;
  orderNumber?: string;
}

type Step = 'pay' | 'utr' | 'submitted';

export default function UpiPaymentModal({
  isOpen,
  onClose,
  orderId,
  amount,
  productName,
  productImage,
  tailorUpiId,
  tailorName,
  size,
  orderNumber,
}: UpiPaymentModalProps) {
  const [step, setStep] = useState<Step>('pay');
  const [utr, setUtr] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const transactionRef = `VA${orderId.slice(0, 8).toUpperCase()}`;
  const upiUrl = generateUpiLink({
    upiId: tailorUpiId,
    payeeName: tailorName,
    amount,
    transactionNote: `${productName} - ${orderNumber || orderId.slice(0, 8)}`,
    transactionRef,
  });

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handlePay = useCallback(() => {
    window.location.href = upiUrl;
    setStep('utr');
  }, [upiUrl]);

  const handleCopyUpi = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tailorUpiId);
      setCopied(true);
      toast.success('UPI ID copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy');
    }
  }, [tailorUpiId]);

  const handleSubmitUtr = useCallback(async () => {
    const trimmed = utr.trim();
    if (trimmed.length < 4) {
      toast.error('Please enter a valid UTR / transaction reference');
      return;
    }
    setSubmitting(true);
    try {
      await ordersService.submitPaymentProof(orderId, trimmed, paymentNotes.trim() || undefined);
      setStep('submitted');
      toast.success('Payment proof submitted for verification!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit payment proof');
    } finally {
      setSubmitting(false);
    }
  }, [utr, paymentNotes, orderId]);

  const resetAndClose = () => {
    setStep('pay');
    setUtr('');
    setPaymentNotes('');
    setSubmitting(false);
    setCopied(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={resetAndClose}
          />

          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 px-6 pt-6 pb-10">
              <button
                onClick={resetAndClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <Package size={16} />
                <span>{orderNumber || `Order #${orderId.slice(0, 8)}`}</span>
              </div>
              <h2 className="text-white text-xl font-bold">Complete Payment</h2>
            </div>

            {/* Content */}
            <div className="-mt-6 px-6 pb-6">
              {/* Product Summary Card */}
              <div className="bg-stone-50 rounded-xl p-4 mb-6 flex items-center gap-4 border border-stone-200">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-stone-200 flex items-center justify-center">
                    <Package size={24} className="text-stone-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900 truncate">{productName}</p>
                  <p className="text-sm text-stone-500">Size: {size}</p>
                  <div className="flex items-center gap-1 text-lg font-bold text-maroon-900 mt-1">
                    <IndianRupee size={16} />
                    {amount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 'pay' && (
                  <motion.div
                    key="pay"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    {/* UPI ID + Copy */}
                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                      <p className="text-xs text-stone-500 uppercase font-bold mb-2">Pay to (UPI ID)</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-stone-900 font-mono">{tailorUpiId}</span>
                        <button
                          onClick={handleCopyUpi}
                          className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-lg border border-stone-200 hover:border-maroon-900 transition-colors"
                        >
                          {copied ? (
                            <><Check size={14} className="text-green-600" /> Copied</>
                          ) : (
                            <><Copy size={14} /> Copy</>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-stone-400 mt-2">
                        Payee: {tailorName}
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white rounded-xl p-6 border border-stone-200 flex flex-col items-center">
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100">
                        <QRCode value={upiUrl} size={200} />
                      </div>
                      <p className="text-xs text-stone-400 mt-3 flex items-center gap-1">
                        <QrCode size={12} />
                        {isMobile ? 'Or scan with any UPI app' : 'Scan with any UPI app'}
                      </p>
                    </div>

                    {/* Pay Button */}
                    <button
                      onClick={handlePay}
                      className="w-full bg-maroon-900 hover:bg-maroon-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-maroon-900/20"
                    >
                      {isMobile ? (
                        <><Smartphone size={18} /> Open UPI App</>
                      ) : (
                        <><ExternalLink size={18} /> Open UPI Link</>
                      )}
                      <ChevronRight size={18} />
                    </button>

                    <p className="text-xs text-stone-400 text-center leading-relaxed">
                      <Shield size={12} className="inline mr-1" />
                      You will be redirected to your UPI app to complete payment.
                      After payment, return here to submit your transaction UTR.
                    </p>
                  </motion.div>
                )}

                {step === 'utr' && (
                  <motion.div
                    key="utr"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                      <p className="font-bold mb-1">Payment not completed yet?</p>
                      <p className="text-amber-700">
                        Click the button above to retry payment via your UPI app.
                        If you've already paid, enter the UTR below.
                      </p>
                    </div>

                    {/* Retry Pay */}
                    <button
                      onClick={handlePay}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-stone-200"
                    >
                      <ExternalLink size={16} />
                      Open UPI App Again
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-stone-200" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-3 text-stone-400">Already paid?</span>
                      </div>
                    </div>

                    {/* UTR Input */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1.5">
                        UTR / Transaction Reference <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={utr}
                        onChange={(e) => setUtr(e.target.value.toUpperCase())}
                        placeholder="e.g. HDFC123456789"
                        className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 outline-none transition-all font-mono"
                        maxLength={50}
                        autoFocus
                      />
                      <p className="text-xs text-stone-400 mt-1">
                        Enter the UTR / reference number from your UPI app after payment
                      </p>
                    </div>

                    {/* Optional Notes */}
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1.5">
                        Notes (optional)
                      </label>
                      <textarea
                        value={paymentNotes}
                        onChange={(e) => setPaymentNotes(e.target.value)}
                        placeholder="Any additional info for the tailor..."
                        rows={2}
                        className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-maroon-900 focus:border-maroon-900 outline-none transition-all text-sm resize-none"
                        maxLength={200}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmitUtr}
                      disabled={submitting || utr.trim().length < 4}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
                    >
                      {submitting ? (
                        <><Loader2 className="animate-spin" size={18} /> Submitting...</>
                      ) : (
                        <><Check size={18} /> Submit Payment Proof</>
                      )}
                    </button>
                  </motion.div>
                )}

                {step === 'submitted' && (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      >
                        <Check size={40} className="text-emerald-600" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900">Payment Proof Submitted!</h3>
                      <p className="text-stone-500 mt-1">
                        Your payment is being verified by {tailorName}.
                        You'll be notified once confirmed.
                      </p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-4 w-full border border-stone-200">
                      <p className="text-xs text-stone-500 uppercase font-bold mb-1">UTR Submitted</p>
                      <p className="text-lg font-mono font-bold text-stone-900">{utr}</p>
                    </div>
                    <button
                      onClick={resetAndClose}
                      className="w-full bg-maroon-900 hover:bg-maroon-800 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
