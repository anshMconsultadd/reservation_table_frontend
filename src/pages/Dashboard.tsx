import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAvailableTables, reserveTable, cancelReservation } from "../services/tableService";
import TableCard from "../components/TableCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token ,logout} = useContext(AuthContext)!;
  const [tables, setTables] = useState<any[]>([]);
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="p-4">
      <div></div>
      <h1 className="text-3xl mb-4">Available Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} onReserved={handleReserve} onCanceled={handleCancel} />
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Dashboard;
