import { useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
import {
  getAvailableTables,
  reserveTable,
  cancelReservation,
} from "../services/tableService";
import TableCard from "../components/TableCard";

const Dashboard = () => {
  // const { user } = useContext(AuthContext)!;
  const [tables, setTables] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchTables = async () => {
      try {
        const data = await getAvailableTables(token!);
        setTables(data);
      } catch (error) {
        console.error("Failed to fetch tables", error);
      }
    };
    fetchTables();
  }, []);

  const handleReserve = async (tableId: number) => {
    try {
      if (token) {
        await reserveTable(tableId, token!);
        setTables(
          tables.map((table) =>
            table.id === tableId ? { ...table, is_reserved: true } : table
          )
        );
      }
    } catch (error) {
      console.error("Failed to reserve table", error);
    }
  };

  const handleCancel = async (tableId: number) => {
    try {
      if (token) {
        await cancelReservation(tableId, token!);
        setTables(
          tables.map((table) =>
            table.id === tableId ? { ...table, is_reserved: false } : table
          )
        );
      }
    } catch (error) {
      console.error("Failed to cancel reservation", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">
        Available Tables
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onReserved={handleReserve}
            onCanceled={handleCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
