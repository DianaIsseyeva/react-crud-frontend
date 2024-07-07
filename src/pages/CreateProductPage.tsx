import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from '../api/products';

const CreateProduct = React.lazy(() => import('../containers/CreateProduct'));

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (formData: FormData) => {
    try {
      const responseCreateProduct = await createProduct(formData);
      if (responseCreateProduct) toast.success('Product created successfully');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateProduct onSubmit={handleCreateProduct} />
      </Suspense>
    </div>
  );
};

export default CreateProductPage;
