import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Players from './pages/Players';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/players" element={<Players />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
