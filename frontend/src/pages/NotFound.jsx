import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center mt-20">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="mb-4">Page not found.</p>
    <Link to="/dashboard" className="text-blue-600">
      Go to Dashboard
    </Link>
  </div>
);

export default NotFound;
