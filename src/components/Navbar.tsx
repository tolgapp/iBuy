import { Link, useLocation } from "react-router-dom";
import menuIcon from "/images/icons/menu.png";
import closeIcon from "/images/icons/close.png";
import "../style/Navbar.css";

type NavbarProps = {
  isLoggedIn: boolean;
  isMobile: boolean;
  closeNews: boolean;
  handleMobileMenu: () => void;
  showSearch: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  showSearch,
  closeNews,
  isMobile,
  handleMobileMenu,
}) => {
  const { pathname } = useLocation();

  const isFavorites =
    pathname === "/favorites" ||
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/update-profile";

  const handleLinkClick = () => {
    if (isMobile) {
      handleMobileMenu();
    }
  };

  return (
    <nav className={isFavorites ? "underline" : ""}>
      <div className="mobile-menu-icon" onClick={handleMobileMenu}>
        {isMobile ? (
          <img onClick={handleMobileMenu} src={closeIcon} alt="close icon" />
        ) : (
          <img src={menuIcon} alt="menu icon" className="menu-icon" />
        )}
      </div>
      <div
        className={`nav-links ${isMobile ? "mobile-active" : ""}  ${
          closeNews ? "shifted" : ""
        }`}
      >
        <Link onClick={handleLinkClick} to={"/"}>
          Home
        </Link>
        <Link onClick={handleLinkClick} to={"/shop"}>
          Shop
        </Link>
        <Link onClick={handleLinkClick} to={"/favorites"}>
          Favorites
        </Link>
        {!isLoggedIn ? (
          <>
            {isMobile && (
              <Link onClick={handleLinkClick} to={"/login"}>
                <img
                  src="/images/icons/login-second.png"
                  alt="login user icon"
                />
              </Link>
            )}
            {isMobile && (
              <Link onClick={handleLinkClick} to={"/signup"}>
                <button className="signup-button">Sign up</button>
              </Link>
            )}
          </>
        ) : (
          isMobile && (
            <Link onClick={handleLinkClick} to={"/update-profile"}>
              <img
                src="/images/icons/login-second.png"
                title="Profile / Logout"
                alt="login user icon"
              />
            </Link>
          )
        )}
      </div>
      <h2>
        <Link onClick={handleLinkClick} to={"/"}>
          iBuy
        </Link>
      </h2>
      <div className="search-and-signup">
        <img
          src="/images/icons/search.png"
          alt="search icon"
          onClick={showSearch}
        />
        {!isLoggedIn && (
          <Link onClick={handleLinkClick} to={"/login"}>
            <img src="/images/icons/login-second.png" alt="login user icon" />
          </Link>
        )}
        {isLoggedIn ? (
          <Link onClick={handleLinkClick} to={"/update-profile"}>
            <img
              src="/images/icons/login-second.png"
              title="Profile / Logout"
              alt="login user icon"
            />
          </Link>
        ) : (
          !isLoggedIn && (
            <Link onClick={handleLinkClick} to={"/signup"}>
              <button className="signup-button">Sign up</button>
            </Link>
          )
        )}
      </div>
      <img
          src="/images/icons/search.png"
          alt="search icon"
          onClick={showSearch}
          className="mobile-search-icon"
        />
    </nav>
  );
};

export default Navbar;
