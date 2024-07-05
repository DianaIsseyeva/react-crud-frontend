import axios from 'axios';
import { TableRowData } from '../types';

const API_URL = 'http://localhost:8000/products';

export const fetchProducts = async (
  page: number = 1,
  limit: number = 5
): Promise<{
  products: TableRowData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}> => {
  const response = await axios.get(API_URL, { params: { page, limit } });
  return response.data;
};

export const createProduct = async (product: Omit<TableRowData, 'id'>): Promise<TableRowData> => {
  const response = await axios.post(API_URL, product);
  return response.data;
};
