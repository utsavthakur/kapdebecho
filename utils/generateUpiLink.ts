interface UpiLinkParams {
  upiId: string;
  payeeName: string;
  amount: number;
  transactionNote?: string;
  transactionRef?: string;
}

export function generateUpiLink({
  upiId,
  payeeName,
  amount,
  transactionNote = '',
  transactionRef = '',
}: UpiLinkParams): string {
  const params = new URLSearchParams();
  params.set('pa', upiId);
  params.set('pn', payeeName.slice(0, 30));
  params.set('am', amount.toFixed(2));
  params.set('tn', transactionNote.slice(0, 50));
  params.set('cu', 'INR');
  if (transactionRef) {
    params.set('tr', transactionRef);
  }
  return `upi://pay?${params.toString()}`;
}
