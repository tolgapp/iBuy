import { Link } from "react-router-dom"
import "../style/Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <div className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/favs"}>Favorites</Link>
      </div>
      <h2><Link to={"/"}>iBuy</Link></h2>
      <button className="signup">Sign up</button>
    </nav>
  )
}
export default Navbar