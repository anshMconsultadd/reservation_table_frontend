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
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 transition hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Table #{table.id}
      </h2>

      <p className="text-gray-600">
        <span className="font-medium">Capacity:</span>{" "}
        {editingTable === table.id ? (
          <input
            type="number"
            value={newCapacity}
            onChange={(e) => setNewCapacity(e.target.value)}
            className="p-2 border rounded w-20 text-center outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          table.capacity
        )}
      </p>

      <p className="text-gray-600">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`font-semibold ${
            table.is_reserved ? "text-red-500" : "text-green-500"
          }`}
        >
          {table.is_reserved ? "Reserved" : "Available"}
        </span>
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {editingTable === table.id ? (
          <button
            onClick={() => handleUpdate(table.id)}
            className="w-full bg-green-500 text-white py-2 rounded-md font-medium transition hover:bg-green-600"
          >
            Update Table
          </button>
        ) : (
          <button
            onClick={() => setEditingTable(table.id)}
            className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium transition hover:bg-yellow-600"
          >
            Edit Table
          </button>
        )}
        <button
          onClick={() => handleDelete(table.id)}
          className="w-full bg-red-500 text-white py-2 rounded-md font-medium transition hover:bg-red-600"
        >
          Delete Table
        </button>
      </div>
    </div>
  );
};

export default AdminTableCard;
