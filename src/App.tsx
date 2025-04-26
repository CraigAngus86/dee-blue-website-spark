
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { configureImageService } from '@/lib/config/imageConfig';
import Layout from '@/components/layout/Layout';
import NewsPage from '@/pages/NewsPage';
import MatchCentre from '@/pages/MatchCentre';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

function App() {
  useEffect(() => {
    configureImageService();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/news" element={<Layout><NewsPage /></Layout>} />
      <Route path="/matches" element={<Layout><MatchCentre /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

export default App;
