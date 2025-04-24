import { Link, useLocation } from "react-router-dom";
import menuIcon from "/images/icons/menu.png";
import closeIcon from "/images/icons/close.png";
import "../style/Navbar.css";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const isFavorites =
    pathname === "/favorites" ||
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/update-profile";

  const handleClick = () => {
    setIsMobile((prev) => !prev);
  };

  return (
    <header>
      <div className="container">
        {/* Handling Mobile Menu if width < 861 px */}
        <div className="mobileContainer">
          {isMobile ? (
            <img src={closeIcon} alt="burger menu icon" onClick={handleClick} />
          ) : (
            <img src={menuIcon} alt="burger menu icon" onClick={handleClick} />
          )}
          {isMobile && (
            <MobileMenu
              isLoggedIn={isLoggedIn}
              handleClick={handleClick}
              closeNews={closeNews}
              isMobile={isMobile}
            />
          )}
        </div>
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
            {isLoggedIn ? (
              <Link to={"/update-profile"}>
                <img
                  src="/images/icons/login.png"
                  title="Profile / Logout"
                  alt="Profile"
                />
              </Link>
            ) : (
              <Link to={"/signup"}>
                <button className="signup-button">Sign up</button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
