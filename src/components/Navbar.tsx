import { Link } from "react-router-dom";
import menuIcon from "/images/icons/menu.png";
import closeIcon from "/images/icons/close.png";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { navLinkStyle } from "../utils/helper";
import Logo from "./Logo";

type NavbarProps = {
  closeNews: boolean;
  showSearch: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ showSearch, closeNews }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    setIsMobile((prev) => !prev);
  };

  return (
    <header className="bg-white p-4 shadow-md relative z-10 ">
      <div className="flex lg:justify-between items-center container mx-auto min-w-full">
        <div className="sm:hidden w-full flex justify-between space-x-4">
          {isMobile ? (
            <img
              src={closeIcon}
              alt="Close menu"
              className="w-6 h-6"
              onClick={handleClick}
            />
          ) : (
            <img
              src={menuIcon}
              alt="Open menu"
              className="w-6 h-6"
              onClick={handleClick}
            />
          )}
        </div>
        <Logo variant="navbar" />
        <nav className="hidden sm:flex space-x-6 w-full md:items-center md:justify-between px-6">
          <ul className="sm:flex space-x-6 hidden ">
            <li>
              <Link to="/" className={navLinkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className={navLinkStyle}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={navLinkStyle}>
                Favorites
              </Link>
            </li>
          </ul> 
          <div className="sm:flex items-center space-x-4 hidden ">
            <button className="p-2 rounded-full" onClick={showSearch}>
              <img
                src="/images/icons/search.png"
                alt="Search"
                className="w-6 h-6"
              />
            </button>
            {isLoggedIn ? (
              <Link to="/update-profile">
                <img
                  src="/images/icons/login.png"
                  alt="Profile"
                  className="w-6 h-6"
                />
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {isMobile && (
        <MobileMenu
          handleClick={handleClick}
          closeNews={closeNews}
          isMobile={isMobile}
        />
      )}
    </header>
  );
};

export default Navbar;
