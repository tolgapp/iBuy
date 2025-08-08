import { Link } from "react-router-dom";

const DropdownMenu = () => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg z-50 px-6 py-4 w-40 flex flex-col items-center h-80">
      <Link to={"/login"} className="w-full">
        <button className="w-full text-sm py-2 hover:bg-gray-100 rounded">Login</button>
      </Link>
      <Link to={"/signup"} className="w-full">
        <button className="w-full text-sm py-2 hover:bg-gray-100 rounded">Sign up</button>
      </Link>
    </div>
  );
};
export default DropdownMenu