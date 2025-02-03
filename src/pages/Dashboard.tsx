import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAvailableTables, reserveTable, cancelReservation } from "../services/tableService";

const Dashboard = () => {
  const { token } = useContext(AuthContext)!;
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getAvailableTables();
        setTables(data);
      } catch (error) {
        console.error("Failed to fetch tables", error);
      }
    };
    fetchTables();
  }, []);

  const handleReserve = async (tableId: number) => {
    try {
      await reserveTable(tableId, token!);
      setTables(tables.map(table => table.id === tableId ? { ...table, is_reserved: true } : table));
    } catch (error) {
      console.error("Failed to reserve table", error);
    }
  };

  const handleCancel = async (tableId: number) => {
    try {
      await cancelReservation(tableId, token!);
      setTables(tables.map(table => table.id === tableId ? { ...table, is_reserved: false } : table));
    } catch (error) {
      console.error("Failed to cancel reservation", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Available Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl mb-2">Table #{table.id}</h2>
            <p>Capacity: {table.capacity}</p>
            <p>Status: {table.is_reserved ? "Reserved" : "Available"}</p>
            {table.is_reserved ? (
              <button onClick={() => handleCancel(table.id)} className="mt-2 w-full bg-red-500 text-white py-2 rounded">
                Cancel Reservation
              </button>
            ) : (
              <button onClick={() => handleReserve(table.id)} className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
                Reserve Table
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
