
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import OurStory from './pages/OurStory';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Sectors from './pages/Sectors';
import SectorDetail from './pages/SectorDetail';
import Leadership from './pages/Leadership';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/sectors/:sectorId" element={<SectorDetail />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
