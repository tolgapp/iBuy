import { Link } from "react-router-dom";
import "../style/MobileMenu.css";
import { useEffect, useState } from "react";

type MobileMenuProps = {
  isLoggedIn: boolean;
  isMobile: boolean;
  closeNews: boolean;
  handleClick: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isLoggedIn,
  isMobile,
  closeNews,
  handleClick
}) => {

  return (
    <div className={`mobile-links ${closeNews ? "shifted" : ""}`}>
      <nav>
        <Link onClick={handleClick} to={"/"}>Home</Link>
        <Link onClick={handleClick} to={"/shop"}>Shop</Link>
        <Link onClick={handleClick} to={"/favorites"}>Favorites</Link>
      </nav>
      {!isLoggedIn ? (
        <div className="mobile-nav-icons-container">
          {isMobile && (
            <Link onClick={handleClick} to={"/login"}>
              <img src="/images/icons/login.png" alt="login user icon" />
            </Link>
          )}
          {isMobile && (
            <Link onClick={handleClick} to={"/signup"}>
              <button className="signup-button">Sign up</button>
            </Link>
          )}
        </div>
      ) : (
        isMobile && (
          <Link onClick={handleClick} to={"/update-profile"}>
            <img src="/images/icons/login-second.png" title="Profile / Logout" alt="login user icon" />
          </Link>
        )
      )}
    </div>
  );
};

export default MobileMenu;