import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type MobileMenuProps = {
  isMobile: boolean;
  closeNews: boolean;
  handleClick: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobile,
  closeNews,
  handleClick,
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className={`absolute flex justify-between w-full border bg-white p-5 mt-[.9rem] ${
        closeNews ? "shifted" : ""
      } ${
        isMobile ? "block" : "hidden"
      } sm:flex sm:justify-between translate-x-[-1rem]`}
    >
      <nav className="z-50 flex flex-col text-xl space-y-4">
        <Link onClick={handleClick} to={"/"}>
          Home
        </Link>
        <Link onClick={handleClick} to={"/shop"}>
          Shop
        </Link>
        <Link onClick={handleClick} to={"/favorites"}>
          Favorites
        </Link>
      </nav>
      {!isLoggedIn ? (
        <div className="mobile-nav-icons-container">
          {isMobile && (
            <div className="flex flex-col gap-4 items-end">
              <Link onClick={handleClick} to={"/login"}>
                <button className="border px-6 py-2 cursor-pointer">Login</button>
              </Link>
              <Link onClick={handleClick} to={"/signup"}>
                <button className="border px-6 py-2 cursor-pointer">Sign up</button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        isMobile && (
          <Link onClick={handleClick} to={"/update-profile"}>
            <img
              src="/images/icons/login.png"
              title="Profile / Logout"
              alt="login user icon"
            />
          </Link>
        )
      )}
    </div>
  );
};

export default MobileMenu;
