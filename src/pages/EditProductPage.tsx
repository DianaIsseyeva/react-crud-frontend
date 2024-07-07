import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateProduct } from '../api/products';

const EditProduct = React.lazy(() => import('../containers/EditProduct'));

const EditProductPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEditProduct = async (formData: FormData, id: number) => {
    try {
      const responseEditProduct = await updateProduct(formData, id);
      if (responseEditProduct) toast.success('Product updated successfully');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct onSubmit={handleEditProduct} />
      </Suspense>
    </div>
  );
};

export default EditProductPage;
