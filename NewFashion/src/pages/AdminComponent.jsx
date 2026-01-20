import React, { useEffect, useState } from "react";
import publicApi from "../pages/api/publicApi.js"

function AdminComponent() {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({ name: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); 

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await publicApi.get("/api/users", config);
      setUsers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false);
    }
  };

  // Fetch all managers
  const fetchManagers = async () => {
    try {
      setLoading(true);
      const res = await publicApi.get("/api/managers", config);
      setManagers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching managers", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchManagers();
  }, []);

  // Add new manager
  const handleAddManager = async () => {
    try {
      if (!newManager.name || !newManager.lastName || !newManager.email || !newManager.password) {
        alert("Please fill all fields");
        return;
      }
      const res = await publicApi.post("/api/manager", newManager, config);
      alert("Manager added successfully");
      console.log(res);
      
      setNewManager({ name: "", lastName: "", email: "", password: "" });
      fetchManagers(); // refresh managers list
    } catch (error) {
      console.error("Error adding manager", error);
      alert(error.response?.data?.message || "Error adding manager");
    }
  };

  // Delete manager
  const handleDeleteManager = async (id) => {
    if (!window.confirm("Are you sure you want to delete this manager?")) return;
    try {
      await publicApi.delete(`/api/manager/${id}`, config);
      alert("Manager deleted successfully");
      fetchManagers(); // refresh managers list
    } catch (error) {
      console.error("Error deleting manager", error);
      alert(error.response?.data?.message || "Error deleting manager");
    }
  };

 return (
  <div className="p-4 sm:p-6 md:mt-16 mt-20 max-w-7xl mx-auto">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
      Admin Dashboard
    </h1>

    {loading && <p className="text-center text-gray-500">Loading...</p>}

    {/* USERS */}
    <section className="mb-10 bg-white shadow rounded-xl p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2 text-center">Orders</th>
              <th className="border px-3 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2 break-all">{user.email}</td>
                <td className="border px-3 py-2 text-center">{user.totalOrders}</td>
                <td className="border px-3 py-2 text-right">
                  ₹ {user.totalAmount?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* MANAGERS */}
    <section className="bg-white shadow rounded-xl p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Managers</h2>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{manager.name}</td>
                <td className="border px-3 py-2 break-all">{manager.email}</td>
                <td className="border px-3 py-2 text-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    onClick={() => handleDeleteManager(manager._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MANAGER */}
      <div className="border rounded-xl p-4 bg-gray-50">
        <h3 className="font-semibold mb-4 text-gray-700">
          Add New Manager
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="First Name"
            value={newManager.name}
            onChange={(e) =>
              setNewManager({ ...newManager, name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Last Name"
            value={newManager.lastName}
            onChange={(e) =>
              setNewManager({ ...newManager, lastName: e.target.value })
            }
          />

          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={newManager.email}
            onChange={(e) =>
              setNewManager({ ...newManager, email: e.target.value })
            }
          />

          <input
            type="password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={newManager.password}
            onChange={(e) =>
              setNewManager({ ...newManager, password: e.target.value })
            }
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          onClick={handleAddManager}
        >
          Add Manager
        </button>
      </div>
    </section>
  </div>
);

}

export default AdminComponent;
