import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import Button from '../components/Button';
import { Scissors, ArrowRight, Loader2 } from 'lucide-react';

const Customize: React.FC = () => {
  const navigate = useNavigate();
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const check = async () => {
      const role = await authService.getCurrentUserRole();
      if (role === 'tailor') {
        navigate('/tailor/dashboard', { replace: true });
        return;
      }
      setCheckingRole(false);
    };
    check();
  }, [navigate]);

  if (checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader2 className="animate-spin text-maroon-900 h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <Scissors size={64} className="mx-auto text-maroon-900 mb-6" />
      <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">
        Choose a Tailor to Get Started
      </h1>
      <p className="text-stone-500 max-w-lg mx-auto mb-8">
        Browse our verified tailors, pick a product, select your size, and place an order — all in a few clicks.
      </p>
      <Link to="/discovery">
        <Button size="lg" className="gap-2">
          Browse Tailors & Products <ArrowRight size={18} />
        </Button>
      </Link>
    </div>
  );
};

export default Customize;
