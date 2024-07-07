import axios from 'axios';
import { TableRowData } from '../types';

const API_URL = 'http://localhost:8000/api/products';

export const fetchProducts = async (
  page: number = 1,
  limit: number = 5,
  title?: string
): Promise<{
  products: TableRowData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}> => {
  const params: { [key: string]: number | string } = { page, limit };

  if (title) {
    params.title = title;
  }

  const response = await axios.get(API_URL, { params });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to fetch products');
  }
};

export const createProduct = async (formData: FormData): Promise<TableRowData> => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error('Failed to create product');
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  if (response.status !== 204) {
    throw new Error('Failed to delete product');
  }
};

export const updateProduct = async (formData: FormData, id: number): Promise<TableRowData> => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to update product');
  }
};

export const fetchProductById = async (id: number): Promise<TableRowData> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch product');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch product');
  }
};
