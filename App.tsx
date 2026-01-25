import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import TailorProfile from './pages/TailorProfile';
import Customize from './pages/Customize';
import TailorDashboard from './pages/TailorDashboard';
import HowItWorks from './pages/HowItWorks';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/tailor/:id" element={<TailorProfile />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/partner/dashboard" element={<TailorDashboard />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;