import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminTableCard from "../components/AdminTableCard";
import {
  getAllTables,
  updateTable,
  deleteTable,
  createTable,
} from "../services/adminTableService";

const AdminPanel = () => {
  const { user } = useContext(AuthContext)!;
  const [tables, setTables] = useState<any[]>([]);
  const [newCapacity, setNewCapacity] = useState<number | string>("");
  const [editingTable, setEditingTable] = useState<number | null>(null);
  const [newTableCapacity, setNewTableCapacity] = useState<number | string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/dashboard");
    } else {
      const fetchTables = async () => {
        try {
          const data = await getAllTables(token!);
          setTables(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTables();
    }
  }, []);

  const handleUpdate = async (tableId: number) => {
    try {
      await updateTable(tableId, Number(newCapacity), token!);
      setTables(
        tables.map((table) =>
          table.id === tableId
            ? { ...table, capacity: newCapacity, is_reserved: false }
            : table
        )
      );
      setNewCapacity("");
      setEditingTable(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (tableId: number) => {
    try {
      await deleteTable(tableId, token!);
      setTables(tables.filter((table) => table.id !== tableId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTable = async () => {
    if (Number(newTableCapacity) <= 0) {
      alert("Please enter a valid capacity");
      return;
    }

    try {
      const newTable = await createTable(Number(newTableCapacity), token!);
      setTables((prevTables) => [...prevTables, newTable.table]);
      setNewTableCapacity("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Admin Panel - Manage Tables</h1>

      <div className="mb-4 p-4 border rounded shadow-lg">
        <h2 className="text-xl mb-2">Create a New Table</h2>
        <input
          type="number"
          value={newTableCapacity}
          onChange={(e) => setNewTableCapacity(e.target.value)}
          placeholder="Enter table capacity"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleCreateTable}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
        >
          Create Table
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <AdminTableCard
            key={table.id}
            table={table}
            editingTable={editingTable}
            newCapacity={newCapacity}
            setNewCapacity={setNewCapacity}
            handleUpdate={handleUpdate}
            setEditingTable={setEditingTable}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
