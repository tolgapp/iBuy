import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";
import menuIcon from "/images/icons/menu.png";
import closeIcon from "/images/icons/close.png";
import { useState } from "react";

type NavbarProps = {
  isLoggedIn: boolean;
  closeNews: boolean;
  showSearch: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, showSearch, closeNews }) => {
  const { pathname } = useLocation();
  const [mobile, setMobile] = useState(false);

  const isFavorites =
    pathname === "/favorites" ||
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/update-profile";

  const handleMobileMenu = () => {
    setMobile(!mobile);
    document.body.classList.toggle("no-scroll", !mobile);
  };

  return (
    <nav className={isFavorites ? "underline" : ""}>
      <div className="mobile-menu-icon" onClick={handleMobileMenu}>
      {mobile ? (
          <img onClick={handleMobileMenu} src={closeIcon} alt="close icon" />
        ) : (
          <img src={menuIcon} alt="menu icon" className="menu-icon" />
        )}
      </div>
      <div className={`nav-links ${mobile ? "mobile-active" : ""}  ${closeNews ? "shifted" : ""}`}>
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/favorites"}>Favorites</Link>
      </div>
      <h2>
        <Link to={"/"}>iBuy</Link>
      </h2>
      <div className="search-and-signup">
        <img
          src="/images/icons/search.png"
          alt="search icon"
          onClick={showSearch}
        />
        {isLoggedIn ? (
          ""
        ) : (
          <Link to={"/login"}>
            <img src="/images/icons/login-second.png" alt="login user icon" />
          </Link>
        )}
        {isLoggedIn ? (
          <Link to={"/update-profile"}>
            <img
              src="/images/icons/login-second.png"
              title="Profile / Logout"
              alt="login user icon"
            />
          </Link>
        ) : (
          <Link to={"/signup"}>
            <button className="signup-button">Sign up</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
