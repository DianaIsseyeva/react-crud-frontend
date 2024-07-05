import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Link to={'/products'}>Display all products</Link>
    </div>
  );
};

export default HomePage;
