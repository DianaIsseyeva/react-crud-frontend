import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CreateProductPage = lazy(() => import('./pages/CreateProductPage'));
const EditProductPage = lazy(() => import('./pages/EditProductPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/create' element={<CreateProductPage />} />
          <Route path='/products/edit/:id' element={<EditProductPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
