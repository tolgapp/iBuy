import { Link } from "react-router-dom"
import "../style/Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <h2>iBuy</h2>
      <div className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Tech</Link>
        <Link to={"/favs"}>Favorites</Link>
      </div>
    </nav>
  )
}
export default Navbar