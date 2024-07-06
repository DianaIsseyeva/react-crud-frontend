import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from '../components/ProductForm';
import { TableRowData } from '../types';

interface CreateProductProps {
  onSubmit: (formData: FormData) => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ onSubmit }) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prevImages => prevImages.concat(fileArray));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: Omit<TableRowData, 'id'> & { images: File[] }) => {
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

    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  return (
    <ProductForm
      onSubmit={handleFormSubmit}
      images={images}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      existingImages={[]} // Добавляем пустой массив
      handleRemoveExistingImage={() => {}} // Добавляем пустую функцию
    />
  );
};

export default CreateProduct;
