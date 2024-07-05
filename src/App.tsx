import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        {/* <Route path="/create" element={<CreateProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
