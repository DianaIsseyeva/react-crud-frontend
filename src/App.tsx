import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import { TableColumn, TableRowData } from './types';
const columns: TableColumn[] = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'image', label: 'Image' },
  { id: 'price', label: 'Price', align: 'right' },
];

const products: TableRowData[] = [
  {
    id: 1,
    title: 'Frozen Yoghurt',
    description: '<p>Delicious frozen yoghurt with a variety of flavors.</p>',
    image: 'https://via.placeholder.com/100',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Ice Cream Sandwich',
    description: '<p>A tasty ice cream sandwich with chocolate cookies.</p>',
    image: 'https://via.placeholder.com/100',
    price: 3.49,
  },
  {
    id: 3,
    title: 'Eclair',
    description: '<p>Classic French pastry filled with creamy custard.</p>',
    image: 'https://via.placeholder.com/100',
    price: 4.99,
  },
  {
    id: 4,
    title: 'Cupcake',
    description: '<p>Moist and fluffy cupcake with a choice of frosting.</p>',
    image: 'https://via.placeholder.com/100',
    price: 2.99,
  },
  {
    id: 5,
    title: 'Gingerbread',
    description: '<p>Spicy and sweet gingerbread cookies.</p>',
    image: 'https://via.placeholder.com/100',
    price: 1.99,
  },
];

function App() {
  const handleDelete = (id: number) => {
    console.log(id);
  };
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage columns={columns} rows={products} onDelete={handleDelete} />} />
        {/* <Route path="/create" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
