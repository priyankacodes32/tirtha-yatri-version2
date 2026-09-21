import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import EnquiryModal from './components/forms/EnquiryModal.jsx';
import { EnquiryModalProvider } from './context/EnquiryModalContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import Home from './pages/Home/Home.jsx';
import Packages from './pages/Packages/Packages.jsx';
import PackageDetails from './pages/PackageDetails/PackageDetails.jsx';
import PlacesToVisit from './pages/PlacesToVisit/PlacesToVisit.jsx';
import DestinationDetails from './pages/DestinationDetails/DestinationDetails.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Blog from './pages/Blog/Blog.jsx';
import BlogDetails from './pages/BlogDetails/BlogDetails.jsx';
import Contact from './pages/Contact/Contact.jsx';
import CustomizeTrip from './pages/CustomizeTrip/CustomizeTrip.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <EnquiryModalProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/tours/:slug" element={<PackageDetails />} />
              <Route path="/explore-mustang" element={<PlacesToVisit />} />
              <Route path="/destinations/:slug" element={<DestinationDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/customize-trip" element={<CustomizeTrip />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <EnquiryModal />
      </EnquiryModalProvider>
    </ThemeProvider>
  );
}
