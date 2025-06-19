import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
