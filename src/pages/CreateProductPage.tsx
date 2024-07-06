import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from '../api/products';
import CreateProduct from '../containers/CreateProduct';

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
      <CreateProduct onSubmit={handleCreateProduct} />
    </div>
  );
};

export default CreateProductPage;
