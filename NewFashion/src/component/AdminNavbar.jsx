import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex gap-6">
      <Link to="/admin" className="hover:underline">
        Dashboard
      </Link>

      <Link to="/productAccess" className="hover:underline">
        Add Product
      </Link>

      <button onClick={handleLogout} className="hover:underline">
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
