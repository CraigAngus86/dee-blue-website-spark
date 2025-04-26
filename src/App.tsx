
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RootLayout from './app/layout';
import HomePage from '@/components/pages/home/HomePage';
import NewsPage from '@/pages/NewsPage';
import TeamAndManagement from '@/pages/TeamAndManagement';
import SpainParkPage from '@/pages/SpainParkPage';
import CommercialOpportunitiesPage from '@/pages/CommercialOpportunitiesPage';
import MatchCentre from '@/pages/MatchCentre';
import NotFound from '@/pages/NotFound';
import { configureImageService } from '@/lib/config/imageConfig';

function App() {
  useEffect(() => {
    configureImageService();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<RootLayout><Outlet /></RootLayout>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/team-and-management" element={<TeamAndManagement />} />
          <Route path="/spain-park" element={<SpainParkPage />} />
          <Route path="/commercial-opportunities" element={<CommercialOpportunitiesPage />} />
          <Route path="/match-centre" element={<MatchCentre />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
