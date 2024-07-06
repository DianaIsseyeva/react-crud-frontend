import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/create' element={<CreateProductPage />} />
        <Route path='/products/edit/:id' element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
