import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { createProduct, fetchProducts } from '../api/products';
import DataTable from '../shared/ui/DataTable';
import { TableColumn, TableRowData } from '../types';

const columns: TableColumn[] = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'image', label: 'Image' },
  { id: 'price', label: 'Price', align: 'right' },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<TableRowData[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleAddProduct = async () => {
    const newProduct: Omit<TableRowData, 'id'> = {
      title: 'New Product',
      description: 'This is a new product',
      image: '/path/to/image.png',
      price: 9.99,
    };
    const createdProduct = await createProduct(newProduct);
    setProducts([...products, createdProduct]);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <div>
      <h1 className='mb-5'>Products</h1>
      <div className='my-10'>
        <Button variant='outlined' onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
      <DataTable columns={columns} rows={products} onDelete={handleDelete} />
    </div>
  );
};

export default ProductsPage;
