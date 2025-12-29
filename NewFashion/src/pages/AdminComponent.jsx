import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminComponent() {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({ name: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); // JWT token

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/users", config);
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
      const res = await axios.get("http://localhost:8080/api/managers", config);
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
      const res = await axios.post("http://localhost:8080/api/manager", newManager, config);
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
      await axios.delete(`http://localhost:8080/api/manager/${id}`, config);
      alert("Manager deleted successfully");
      fetchManagers(); // refresh managers list
    } catch (error) {
      console.error("Error deleting manager", error);
      alert(error.response?.data?.message || "Error deleting manager");
    }
  };

  return (
    <div className="p-6 mt-15">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading...</p>}

      {/* Users Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Orders</th>
              <th className="border px-2 py-1">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.totalOrders}</td>
                <td className="border px-2 py-1">₹ {user.totalAmount?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Managers Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Managers</h2>
        <table className="w-full border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager._id}>
                <td className="border px-2 py-1">{manager.name}</td>
                <td className="border px-2 py-1">{manager.email}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteManager(manager._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Manager Form */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Add New Manager</h3>
          <input
            className="border p-1 mr-2"
            placeholder="First Name"
            value={newManager.name}
            onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            placeholder="Last Name"
            value={newManager.lastName}
            onChange={(e) => setNewManager({ ...newManager, lastName: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            placeholder="Email"
            value={newManager.email}
            onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
          />
          <input
            type="password"
            className="border p-1 mr-2"
            placeholder="Password"
            value={newManager.password}
            onChange={(e) => setNewManager({ ...newManager, password: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
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
