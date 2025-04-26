import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { configureImageService } from '@/lib/config/imageConfig';
import Layout from '@/components/layout/Layout';
import NewsPage from '@/pages/NewsPage';
import MatchCentre from '@/pages/MatchCentre';
import TeamAndManagement from '@/pages/TeamAndManagement';
import SpainParkPage from '@/pages/SpainParkPage';
import CommercialOpportunitiesPage from '@/pages/CommercialOpportunitiesPage';
import NotFound from '@/pages/NotFound';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  useEffect(() => {
    configureImageService();
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout><MatchCentre /></Layout>} />
        <Route path="/news" element={<Layout><NewsPage /></Layout>} />
        <Route path="/team" element={<Layout><TeamAndManagement /></Layout>} />
        <Route path="/matches" element={<Layout><MatchCentre /></Layout>} />
        <Route path="/spainpark" element={<Layout><SpainParkPage /></Layout>} />
        <Route path="/commercial" element={<Layout><CommercialOpportunitiesPage /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
