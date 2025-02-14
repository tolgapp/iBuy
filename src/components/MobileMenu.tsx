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

type MobileMenuProps = {
  isLoggedIn: boolean;
  isMobile: boolean;
  closeNews: boolean;
  handleMobileMenu: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isLoggedIn,
  isMobile,
  closeNews,
  handleMobileMenu,
}) => {
  return (
    <div className={`nav-links ${isMobile ? "mobile-active" : ""} ${closeNews ? "shifted" : ""}`}>
      <Link onClick={handleMobileMenu} to={"/"}>Home</Link>
      <Link onClick={handleMobileMenu} to={"/shop"}>Shop</Link>
      <Link onClick={handleMobileMenu} to={"/favorites"}>Favorites</Link>
      {!isLoggedIn ? (
        <>
          {isMobile && (
            <Link onClick={handleMobileMenu} to={"/login"}>
              <img src="/images/icons/login-second.png" alt="login user icon" />
            </Link>
          )}
          {isMobile && (
            <Link onClick={handleMobileMenu} to={"/signup"}>
              <button className="signup-button">Sign up</button>
            </Link>
          )}
        </>
      ) : (
        isMobile && (
          <Link onClick={handleMobileMenu} to={"/update-profile"}>
            <img src="/images/icons/login-second.png" title="Profile / Logout" alt="login user icon" />
          </Link>
        )
      )}
    </div>
  );
};


export default MobileMenu;
