import React from 'react';
import { MOCK_ORDERS } from '../constants';
import Button from '../components/Button';
import { MessageCircle, Camera, CheckSquare } from 'lucide-react';

const TailorDashboard: React.FC = () => {
  return (
    <div className="bg-stone-100 min-h-screen pb-12">
      <div className="bg-maroon-900 text-white p-6 shadow-md">
         <h1 className="text-xl font-bold">Partner Dashboard</h1>
         <p className="text-maroon-200 text-sm">Welcome back, Masterji Rahmat</p>
      </div>
      
      <div className="max-w-3xl mx-auto p-4 space-y-4 -mt-4">
        {/* Quick Actions */}
        <div className="bg-white p-4 rounded shadow-sm grid grid-cols-2 gap-4">
           <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded border border-green-200 text-green-800">
              <Camera size={32} className="mb-2"/>
              <span className="font-bold">Upload Work</span>
           </button>
           <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded border border-blue-200 text-blue-800">
              <MessageCircle size={32} className="mb-2"/>
              <span className="font-bold">Customer Chat</span>
           </button>
        </div>

        {/* Pending Orders */}
        <h2 className="font-bold text-stone-700 mt-6 ml-1">Today's Orders (2)</h2>
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-gold-500">
             <div className="flex justify-between items-start mb-3">
                <div>
                   <h3 className="font-bold text-lg">{order.item}</h3>
                   <p className="text-sm text-stone-500">Order {order.id}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold uppercase">{order.status}</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="bg-stone-50 p-2 rounded">
                   <span className="block text-stone-400 text-xs">Due Date</span>
                   <span className="font-medium">28 Oct 2023</span>
                </div>
                <div className="bg-stone-50 p-2 rounded">
                   <span className="block text-stone-400 text-xs">Earnings</span>
                   <span className="font-medium text-green-700">₹{order.amount * 0.85}</span>
                </div>
             </div>

             <Button className="w-full">Update Status</Button>
          </div>
        ))}

        {/* Stats */}
        <div className="bg-charcoal text-white p-5 rounded-lg mt-6">
           <div className="flex justify-between items-center">
              <div>
                 <p className="text-stone-400 text-xs uppercase">Wallet Balance</p>
                 <p className="text-2xl font-bold">₹24,500</p>
              </div>
              <Button size="sm" variant="secondary">Withdraw</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TailorDashboard;