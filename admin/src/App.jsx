import { Routes, Route } from 'react-router-dom';
import ProtectedLayout from './components/layout/ProtectedLayout.jsx';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Features from './pages/Features/Features.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Packages from './pages/Packages/Packages.jsx';
import Destinations from './pages/Destinations/Destinations.jsx';
import Enquiries from './pages/Enquiries/Enquiries.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Videos from './pages/Videos/Videos.jsx';
import Blogs from './pages/Blogs/Blogs.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/features" element={<Features />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/blogs" element={<Blogs />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
