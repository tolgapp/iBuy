import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { navLinkStyle } from "../utils/helper";
import Logo from "./Logo";
import menuIcon from "/images/icons/menu.png";
import closeIcon from "/images/icons/close.png";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC<{ showSearch: () => void }> = ({
  showSearch,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const amount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  
  const handleClick = () => {
    setIsMobile((prev) => !prev);
  };
  
  const handleUserMenuClick = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };
  
  useEffect(() => {
    console.log("current", userMenuRef.current)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="relative sm:hidden">
            <Link to="/cart">
              <img
                src="/images/icons/cart.png"
                alt="Cart icon"
                className="w-7 h-7 cursor-pointer"
              />
              {amount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white">
                  {amount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <Logo variant="navbar" />
        <nav className="hidden sm:flex space-x-6 w-full sm:items-center sm:justify-between px-6">
          <ul className="sm:flex space-x-6 hidden">
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
          <div className="sm:flex items-center space-x-4 hidden">
            <button className="p-2 rounded-full" onClick={showSearch}>
              <img
                src="/images/icons/search.png"
                alt="Search"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
            {isLoggedIn ? (
              <Link to="/update-profile">
                <img
                  src="/images/icons/login.png"
                  alt="Profile"
                  className="w-6 h-6 cursor-pointer"
                />
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={handleUserMenuClick}
                  className="p-2 rounded-full"
                >
                  <img
                    src="/images/icons/login.png"
                    alt="User"
                    className="w-6 h-6 cursor-pointer"
                  />
                </button>
                {isUserMenuVisible && (
                  <div
                    ref={userMenuRef}
                    className="hidden sm:absolute top-10 right-0 bg-white shadow-lg p-4 rounded sm:gap-2 sm:flex flex-col w-40"
                  >
                    <Link to="/signup">
                      <button
                        onClick={() => setIsUserMenuVisible(false)}
                        className="bg-black text-white py-2 px-4 rounded w-full text-center cursor-pointer"
                      >
                        Sign up
                      </button>
                    </Link>
                    <Link to="/login">
                      <button
                        onClick={() => setIsUserMenuVisible(false)}
                        className="bg-black text-white py-2 px-4 rounded w-full text-center cursor-pointer"
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="relative">
              <Link to="/cart">
                <img
                  src="/images/icons/cart.png"
                  alt="Cart icon"
                  className="w-7 h-7 cursor-pointer"
                />
                {amount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white">
                    {amount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {isMobile && <MobileMenu handleClick={handleClick} isMobile={isMobile} />}
    </header>
  );
};

export default Navbar;
