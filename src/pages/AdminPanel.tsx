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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Admin Panel - Manage Tables
      </h1>

      {/* Create Table Form */}
      <div className="mb-6 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Create a New Table
        </h2>
        <div className="flex gap-3">
          <input
            type="number"
            value={newTableCapacity}
            onChange={(e) => setNewTableCapacity(e.target.value)}
            placeholder="Enter table capacity"
            className="p-3 border border-gray-300 rounded-lg flex-1 text-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCreateTable}
            className="bg-blue-500 text-white px-5 py-3 rounded-lg font-medium transition hover:bg-blue-600"
          >
            Create Table
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
