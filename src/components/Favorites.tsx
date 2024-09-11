import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Favorites: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // Redirects to signup page so the user can signup and add favorites
  useEffect(() => {
    if (location.pathname === '/favorites') {
      navigate('/signup'); // Redirect to the signup page
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Favorites Page</h1>
      
    </div>
  );
};

export default Favorites;