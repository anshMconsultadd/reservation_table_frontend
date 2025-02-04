import React from "react";

interface AdminTableCardProps {
  table: { id: number; capacity: number; is_reserved: boolean };
  editingTable: number | null;
  newCapacity: number | string;
  setNewCapacity: (value: string) => void;
  handleUpdate: (tableId: number) => void;
  setEditingTable: (tableId: number) => void;
  handleDelete: (tableId: number) => void;
}

const AdminTableCard: React.FC<AdminTableCardProps> = ({
  table,
  editingTable,
  setNewCapacity,
  handleUpdate,
  newCapacity,
  setEditingTable,
  handleDelete,
}) => {
  return (
    <div className="border p-4 rounded shadow-lg">
      <h2 className="text-xl mb-2">Table #{table.id}</h2>
      <p>
        Capacity:{" "}
        {editingTable === table.id ? (
          <input
            type="number"
            value={newCapacity}
            onChange={(e) => setNewCapacity(e.target.value)}
            className="p-1 border rounded"
          />
        ) : (
          table.capacity
        )}
      </p>
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
  );
};

export default AdminTableCard;
