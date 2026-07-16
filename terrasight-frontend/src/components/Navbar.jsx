import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>TerraSight</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}
