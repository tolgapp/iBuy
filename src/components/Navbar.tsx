import { Link, useLocation } from "react-router-dom";
import menuIcon from "/images/icons/menu.png";
import closeIcon from "/images/icons/close.png";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import "../style/Navbar.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type NavbarProps = {
  closeNews: boolean;
  showSearch: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  showSearch,
  closeNews,
}) => {
  
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

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
        <div className="mobileContainer">
          {isMobile ? (
            <img src={closeIcon} alt="burger menu icon" onClick={handleClick} />
          ) : (
            <img src={menuIcon} alt="burger menu icon" onClick={handleClick} />
          )}
          {isMobile && (
            <MobileMenu
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
              <>
                <Link to={"/signup"}>
                  <button className="signup-button">Sign up</button>
                </Link>
                <Link to={"/login"}>
                  <button className="signup-button">Login</button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
