import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';
import Shop from './pages/Shop';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:id' element={<Shop />} />
        {/* TODO: Andere Routen nach und nach einfügen und zum Schluss stylen */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
