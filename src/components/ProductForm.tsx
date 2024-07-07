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
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { TableRowData } from '../types';

interface ProductFormProps {
  initialProduct?: Omit<TableRowData, 'id'>;
  onSubmit: SubmitHandler<Omit<TableRowData, 'id'> & { images: File[] }>;
  images: File[];
  existingImages: string[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleRemoveExistingImage: (index: number) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSubmit,
  images,
  existingImages,
  handleImageChange,
  handleRemoveImage,
  handleRemoveExistingImage,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
    trigger,
  } = useForm<Omit<TableRowData, 'id'> & { images: File[] }>({
    defaultValues: initialProduct,
  });

  useEffect(() => {
    if (initialProduct) {
      setValue('title', initialProduct.title);
      setValue('description', initialProduct.description);
      setValue('status', initialProduct.status);
      setValue('price', initialProduct.price);
    }
  }, [initialProduct, setValue]);

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  setValue('description', '', { shouldValidate: true });
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
              validate: () => images.length > 0 || existingImages.length > 0 || 'Please upload at least one image.',
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
          {existingImages.map((image, index) => (
            <Box key={index} position='relative' mr={2} mb={2}>
              <img src={image} alt={`existing-preview-${index}`} width='100' height='100' />
              <IconButton
                onClick={() => handleRemoveExistingImage(index)}
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
          defaultValue={initialProduct?.price}
          rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be a positive number' } }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Price'
              variant='outlined'
              fullWidth
              type='number'
              InputLabelProps={{
                shrink: typeof field.value === 'number' || field.value !== '',
              }}
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
        <Button variant='contained' color='primary' type='submit' onClick={() => trigger()}>
          Save
        </Button>
      </Box>
    </form>
  );
};

export default ProductForm;
