import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const { user, token } = useContext(AuthContext)!;
  const [tables, setTables] = useState<any[]>([]);
  const [newCapacity, setNewCapacity] = useState<number | string>(""); 
  const [editingTable, setEditingTable] = useState<number | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tables only if the user is an admin
    if (user?.role !== "admin") {
      navigate("/dashboard"); // Redirect non-admin users
    } else {
      const fetchTables = async () => {
        try {
          const response = await axios.get("http://localhost:8000/admin/tables", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTables(response.data);
        } catch (error) {
          console.error("Failed to fetch tables", error);
        }
      };
      fetchTables();
    }
  }, [token, user, navigate]);

  const handleUpdate = async (tableId: number) => {
    try {
      await axios.put(
        `http://localhost:8000/admin/tables/${tableId}`,
        { capacity: newCapacity ,
            is_reserved: false
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTables(tables.map((table) => (table.id === tableId ? { ...table, capacity: newCapacity, is_reserved: false } : table)));
      setNewCapacity("");
      setEditingTable(null);
    } catch (error) {
      console.error("Failed to update table", error);
    }
  };

  const handleDelete = async (tableId: number) => {
    try {
      await axios.delete(`http://localhost:8000/admin/tables/${tableId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTables(tables.filter((table) => table.id !== tableId));
    } catch (error) {
      console.error("Failed to delete table", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Admin Panel - Manage Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl mb-2">Table #{table.id}</h2>
            <p>Capacity: {editingTable === table.id ? (
              <input
                type="number"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="p-1 border rounded"
              />
            ) : (
              table.capacity
            )}</p>
            <p>Status: {table.is_reserved ? "Reserved" : "Available"}</p>
            {editingTable === table.id ? (
              <button
                onClick={() => handleUpdate(table.id)}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded"
              >
                Update Table
              </button>
            ) : (
              <button
                onClick={() => setEditingTable(table.id)}
                className="mt-2 w-full bg-yellow-500 text-white py-2 rounded"
              >
                Edit Table
              </button>
            )}
            <button
              onClick={() => handleDelete(table.id)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded"
            >
              Delete Table
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
