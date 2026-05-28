import React from 'react';
import { Address } from '../features/orders/types';

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
  showTitle?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange, showTitle = true }) => {
  const set = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className="space-y-3">
      {showTitle && <h4 className="text-sm font-bold text-stone-700">Delivery Address</h4>}
      <input
        placeholder="Full Name"
        value={address.fullName}
        onChange={e => set('fullName', e.target.value)}
        className="w-full p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
        required
      />
      <input
        placeholder="Phone Number"
        type="tel"
        value={address.phone}
        onChange={e => set('phone', e.target.value)}
        className="w-full p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
        required
      />
      <input
        placeholder="Address Line 1"
        value={address.line1}
        onChange={e => set('line1', e.target.value)}
        className="w-full p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
        required
      />
      <input
        placeholder="Landmark (optional)"
        value={address.landmark || ''}
        onChange={e => set('landmark', e.target.value)}
        className="w-full p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
      />
      <div className="grid grid-cols-3 gap-2">
        <input
          placeholder="City"
          value={address.city}
          onChange={e => set('city', e.target.value)}
          className="p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
          required
        />
        <input
          placeholder="State"
          value={address.state}
          onChange={e => set('state', e.target.value)}
          className="p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
          required
        />
        <input
          placeholder="Pincode"
          value={address.pincode}
          onChange={e => set('pincode', e.target.value)}
          className="p-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-maroon-900 focus:border-maroon-900 outline-none"
          required
        />
      </div>
    </div>
  );
};

export default AddressForm;
