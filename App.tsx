import React from 'react';
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

function App() {
  const location = useLocation();

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
          <Route path="/partner/dashboard" element={<PageTransition><TailorDashboard /></PageTransition>} />
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;