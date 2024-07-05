import axios from 'axios';
import { TableRowData } from '../types';

const API_URL = 'http://localhost:8000/products';

export const fetchProducts = async (): Promise<TableRowData[]> => {
  const response = await axios.get<TableRowData[]>(API_URL);
  return response.data;
};

export const createProduct = async (product: Omit<TableRowData, 'id'>): Promise<TableRowData> => {
  const response = await axios.post<TableRowData>(API_URL, product);
  return response.data;
};
