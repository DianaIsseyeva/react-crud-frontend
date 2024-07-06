import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TableRowData } from '../types';

interface ProductFormProps {
  initialProduct?: Omit<TableRowData, 'id'>;
  onSubmit: (formData: FormData) => void;
}

interface ProductFormInputs extends Omit<TableRowData, 'id'> {
  images: File[];
}

const CreateProduct: React.FC<ProductFormProps> = ({ initialProduct, onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm<ProductFormInputs>();
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialProduct) {
      setValue('title', initialProduct.title);
      setValue('description', initialProduct.description);
      setValue('status', initialProduct.status);
      setValue('price', initialProduct.price);
    }
  }, [initialProduct, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prevImages => prevImages.concat(fileArray));
      if (fileArray.length > 0) {
        setValue('images', fileArray);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue('images', updatedImages.length > 0 ? updatedImages : []);
  };

  const handleFormSubmit = (data: ProductFormInputs) => {
    if (images.length === 0) {
      setValue('images', [], { shouldValidate: true });
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

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={3}>
        <Controller
          name='title'
          control={control}
          defaultValue=''
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Title'
              variant='outlined'
              fullWidth
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
          )}
        />
      </Box>
      <Box mb={3}>
        <Controller
          name='description'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <ReactQuill
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                if (!field.value || field.value === '<p><br></p>') {
                  toast.error('Description is required.');
                }
              }}
            />
          )}
        />
      </Box>
      <Box mb={3}>
        <FormControl fullWidth error={!!errors.status}>
          <InputLabel id='status-label'>Status</InputLabel>
          <Controller
            name='status'
            control={control}
            defaultValue='active'
            render={({ field }) => (
              <Select {...field} labelId='status-label' label='Status'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='archive'>Archive</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.status ? errors.status.message : ''}</FormHelperText>
        </FormControl>
      </Box>
      <Box mb={3}>
        <FormControl fullWidth error={!!errors.images}>
          <input
            type='file'
            {...register('images', {
              validate: () => images.length > 0 || 'Please upload at least one image.',
            })}
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id='image-upload'
          />
          <label htmlFor='image-upload'>
            <Button variant='contained' component='span'>
              Upload Images
            </Button>
          </label>
          <FormHelperText>{errors.images ? (errors.images.message as string) : ''}</FormHelperText>
        </FormControl>
        <Box display='flex' flexWrap='wrap' mt={2}>
          {images.map((file, index) => (
            <Box key={index} position='relative' mr={2} mb={2}>
              <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width='100' height='100' />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mb={3}>
        <Controller
          name='price'
          control={control}
          defaultValue={undefined}
          rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be a positive number' } }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Price'
              variant='outlined'
              fullWidth
              type='number'
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ''}
            />
          )}
        />
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Button variant='outlined' onClick={() => navigate('/products')}>
          Cancel
        </Button>
        <Button variant='contained' color='primary' type='submit'>
          Save
        </Button>
      </Box>
    </form>
  );
};

export default CreateProduct;
