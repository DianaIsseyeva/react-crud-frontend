import { Box, Button, Pagination, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createProduct, fetchProducts } from '../api/products';
import DataTable from '../shared/ui/DataTable';
import { TableColumn, TableRowData } from '../types';

const columns: TableColumn[] = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'image', label: 'Image' },
  { id: 'price', label: 'Price', align: 'right' },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<TableRowData[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(page + 1, 5);
      if (data) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }
    };
    getProducts();
  }, [page]);

  const handleAddProduct = async () => {
    const newProduct: Omit<TableRowData, 'id'> = {
      title: 'New Product',
      description: 'This is a new product',
      status: 'active',
      image: '/path/to/image.png',
      price: 9.99,
    };
    const createdProduct = await createProduct(newProduct);
    setProducts([...products, createdProduct]);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1>Products</h1>
      <div className='my-5'>
        <Button variant='outlined' onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
      <Box mb={3}>
        <TextField label='Search Products' variant='outlined' fullWidth value={search} onChange={handleSearchChange} />
      </Box>
      {products && (
        <div>
          <DataTable columns={columns} rows={filteredProducts} onDelete={handleDelete} />
          <Pagination
            className='flex justify-center mt-10'
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
