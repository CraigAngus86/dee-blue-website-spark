
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

// Import routes
import HomePage from '@/pages/HomePage';
import NewsPage from '@/pages/NewsPage';
import TeamAndManagement from '@/pages/TeamAndManagement';
import SpainParkPage from '@/pages/SpainParkPage';
import CommercialOpportunitiesPage from '@/pages/CommercialOpportunitiesPage';
import MatchCentre from '@/pages/MatchCentre';
import NotFound from '@/pages/NotFound';

// Import image configuration
import { configureImageService } from '@/lib/config/imageConfig';

function App() {
  // Initialize image service configuration
  useEffect(() => {
    configureImageService();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/team-and-management" element={<TeamAndManagement />} />
          <Route path="/spain-park" element={<SpainParkPage />} />
          <Route path="/commercial-opportunities" element={<CommercialOpportunitiesPage />} />
          <Route path="/match-centre" element={<MatchCentre />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
