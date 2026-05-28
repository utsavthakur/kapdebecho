import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import TailorProfile from './pages/TailorProfile';
import Customize from './pages/Customize';
import TailorDashboard from './pages/TailorDashboard';
import HowItWorks from './pages/HowItWorks';
import Auth from './pages/Auth';
import MyOrders from './pages/MyOrders';
import TailorAuth from './pages/TailorAuth';
import TailorLanding from './pages/TailorLanding';
import ProtectedTailorRoute from './components/ProtectedTailorRoute';

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/discovery" element={<PageTransition><Discovery /></PageTransition>} />
          <Route path="/tailor/:id" element={<PageTransition><TailorProfile /></PageTransition>} />
          <Route path="/customize" element={<PageTransition><Customize /></PageTransition>} />
          <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
          <Route path="/my-orders" element={<PageTransition><MyOrders /></PageTransition>} />
          <Route path="/partner" element={<PageTransition><TailorLanding /></PageTransition>} />
          <Route path="/tailor/login" element={<PageTransition><TailorAuth /></PageTransition>} />
          <Route element={<PageTransition><ProtectedTailorRoute /></PageTransition>}>
            <Route path="/tailor/dashboard" element={<TailorDashboard />} />
          </Route>
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;