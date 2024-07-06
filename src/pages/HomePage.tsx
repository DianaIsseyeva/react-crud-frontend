import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Link to={'/products?page=1&limit=5'}>Display all products</Link>
    </div>
  );
};

export default HomePage;
