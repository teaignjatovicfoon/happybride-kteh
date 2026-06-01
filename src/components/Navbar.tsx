import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">HappyBride</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/vendors">Vendors</Link>
        <Link to="/inspo">Inspo</Link>
        <Link to="/plan">Plan</Link>
      </div>
    </nav>
  );
}

export default Navbar;