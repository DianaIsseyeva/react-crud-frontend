import { Box, Button, Pagination, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../api/products';
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
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(page + 1, 5, searchTitle);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, [page, searchTitle]);

  const handleAddProduct = () => {
    navigate('/products/create');
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
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
            page={page + 1}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
