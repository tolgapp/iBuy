import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";

type NavbarProps = {
  isLoggedIn: boolean;
  closeNews: boolean;
  showSearch: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  showSearch,
  closeNews,
}) => {
  const { pathname } = useLocation();

  const isFavorites =
    pathname === "/favorites" ||
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/update-profile";

  return (
    <header>
      <div className="container">
        <h1 className="logo-header">
          <Link to={"/"}>iBuy</Link>
        </h1>
        <nav className={isFavorites ? "underline" : ""}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link to={"/favorites"}>Favorites</Link>
            </li>
          </ul>
          <div className="search-and-signup">
            <button className="search-button" onClick={showSearch}>
              <img src="/images/icons/search.png" alt="Search" />
            </button>
            {!isLoggedIn ? (
              <>
                <Link to={"/login"}>
                  <img src="/images/icons/login-second.png" alt="Login" />
                </Link>
                <Link to={"/signup"}>
                  <button className="signup-button">Sign up</button>
                </Link>
              </>
            ) : (
              <Link to={"/update-profile"}>
                <img
                  src="/images/icons/login-second.png"
                  title="Profile / Logout"
                  alt="Profile"
                />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
