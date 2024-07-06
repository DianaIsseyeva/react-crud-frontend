import { Box, Button, Pagination, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../api/products';
import DataTable from '../components/DataTable';
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
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState('');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const getProducts = async (page: number, limit: number, searchTitle: string) => {
    try {
      const data = await fetchProducts(page, limit, searchTitle);
      if (data) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts(page, limit, searchTitle);
  }, [page, limit, searchTitle]);

  const handleAddProduct = () => {
    navigate('/products/create');
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    const newProducts = await fetchProducts(page, limit, searchTitle);
    if (newProducts.products.length === 0 && page > 1) {
      navigate(`/products?page=${page - 1}&limit=${limit}`, { replace: true });
    } else {
      setProducts(newProducts.products);
      setTotalPages(newProducts.totalPages);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    navigate(`/products?page=${newPage}&limit=5`, { replace: true });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className='my-5'>
        <Button variant='outlined' onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
      <Box mb={3}>
        <TextField
          label='Search Products'
          variant='outlined'
          fullWidth
          value={searchTitle}
          onChange={handleSearchChange}
        />
      </Box>
      {products && (
        <div>
          <DataTable columns={columns} rows={products} onDelete={handleDelete} />
          <Pagination
            className='flex justify-center mt-10'
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
