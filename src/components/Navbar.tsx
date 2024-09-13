import { Link, useLocation } from "react-router-dom"
import "../style/Navbar.css"

type Search = {
  showSearch(): void
}

const Navbar: React.FC<Search> = ({showSearch}) => {

  const {pathname} = useLocation()

  const isFavorites = pathname === "/favorites" || pathname === "/signup";


  return (
    <nav className={isFavorites ? "underline" : ""}>
      <div className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/favorites"}>Favorites</Link>
      </div>
      <h2><Link to={"/"}>iBuy</Link></h2>
      <div className="search-and-signup">
        <img src="/images/icons/search.png" alt="search icon" onClick={showSearch}/>
        <Link to={"/login"}><img src="/images/icons/login-second.png" alt="login user icon"/></Link>
        <Link to={"/signup"}><button className="signup-button">Sign up</button></Link>
      </div>
    </nav>
  )
}
export default Navbar 