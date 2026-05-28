import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { authService } from '../services/auth';
import { Loader2 } from 'lucide-react';

const ProtectedTailorRoute: React.FC = () => {
    const [state, setState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

    useEffect(() => {
        const checkAccess = async () => {
            const role = await authService.getCurrentUserRole();
            if (role === 'tailor') {
                setState('authorized');
            } else if (role === null) {
                setState('unauthorized');
            } else {
                await supabase.auth.signOut();
                setState('unauthorized');
            }
        };
        checkAccess();
    }, []);

    if (state === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FDFBF7]">
                <Loader2 className="animate-spin text-[#8B4513] h-12 w-12" />
            </div>
        );
    }

    return state === 'authorized' ? <Outlet /> : <Navigate to="/tailor/login" replace />;
};

export default ProtectedTailorRoute;
