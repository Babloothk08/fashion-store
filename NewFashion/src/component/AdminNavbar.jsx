import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  

  return (
    <header className="bg-gray-800 text-white fixed w-full top-0 z-50 shadow-lg mb-5 md:flex md:h-20 md:items-center md:justify-between md:px-3">
      
      <div className="  px-6 py-1 flex items-center justify-between ">
        <Link
          to="/admin"
          className="text-2xl font-extrabold tracking-wide flex items-center gap-1"
        >
          <span className="text-white">Fashion</span>
          <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Store
          </span>
        </Link>
      </div>

      
      <div className="  px-6 py-2 flex  max-sm:flex-row md:flex-row md:justify-start md:gap-6 max-sm:gap-3 gap-5">
        <Link
          to="/admin"
          className="hover:underline py-1 md:py-0"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/product"
          className="hover:underline py-1 md:py-0"
        >
          Add Product
        </Link>

        <Link
          to="/admin/allProducts"
          className="hover:underline py-1 md:py-0"
        >
          Products
        </Link>

        <button
          onClick={handleLogout}
          className="hover:underline py-1 md:py-0 text-left"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
