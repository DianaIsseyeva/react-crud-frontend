import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from '../components/ProductForm';
import { fetchProductById } from '../api/products';
import { TableRowData } from '../types';

interface EditProductProps {
  onSubmit: (formData: FormData, id: number) => Promise<void>;
}

const EditProduct: React.FC<EditProductProps> = ({ onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const [initialProduct, setInitialProduct] = useState<Omit<TableRowData, 'id'>>();
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error('Invalid product ID');
        return;
      }
      try {
        const product = await fetchProductById(parseInt(id, 10));
        setInitialProduct(product);
        setExistingImages(product.image.split(','));
        setImages([]);
      } catch (error) {
        toast.error('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prevImages => prevImages.concat(fileArray));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: Omit<TableRowData, 'id'> & { images: File[] }) => {
    if (images.length === 0 && existingImages.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('status', data.status);
    if (data.price !== undefined) {
      formData.append('price', data.price.toString());
    }
    images.forEach((file, index) => {
      formData.append('images', file, `image-${index}`);
    });
    formData.append('existingImages', existingImages.join(','));

    try {
      await onSubmit(formData, parseInt(id!, 10));
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  return (
    <ProductForm
      initialProduct={initialProduct}
      onSubmit={handleFormSubmit}
      images={images}
      existingImages={existingImages}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleRemoveExistingImage={handleRemoveExistingImage}
    />
  );
};

export default EditProduct;
