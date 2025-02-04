import React from "react";

interface TableCardProps {
  table: { id: number; capacity: number; is_reserved: boolean };
  onReserved: (tableId: number) => void;
  onCanceled: (tableId: number) => void;
}

const TableCard: React.FC<TableCardProps> = ({
  table,
  onReserved,
  onCanceled,
}) => {
  return (
    <div
      className={`p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105
      ${
        table.is_reserved
          ? "bg-red-100 border-red-400"
          : "bg-white border-gray-300"
      }`}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Table #{table.id}
      </h2>
      <p className="text-gray-600 text-lg">
        Capacity: <span className="font-medium">{table.capacity}</span>
      </p>
      <p
        className={`text-lg font-medium ${
          table.is_reserved ? "text-red-600" : "text-green-600"
        }`}
      >
        {table.is_reserved ? "Reserved" : "Available"}
      </p>

      {table.is_reserved ? (
        <button
          onClick={() => onCanceled(table.id)}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-md transition-all"
        >
          Cancel Reservation
        </button>
      ) : (
        <button
          onClick={() => onReserved(table.id)}
          className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md transition-all"
        >
          Reserve Table
        </button>
      )}
    </div>
  );
};

export default TableCard;
