
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";

import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import TeamAndManagement from './pages/TeamAndManagement';
import MatchCentre from './pages/MatchCentre';
import SpainParkPage from './pages/SpainParkPage';
import CommercialOpportunitiesPage from './pages/CommercialOpportunitiesPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/team" element={<TeamAndManagement />} />
          <Route path="/matches" element={<MatchCentre />} />
          <Route path="/spainpark" element={<SpainParkPage />} />
          <Route path="/commercial" element={<CommercialOpportunitiesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
