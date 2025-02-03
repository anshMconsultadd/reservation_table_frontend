 import React from 'react';

interface TableCardProps{
   table:{id:number,capacity:number,is_reserved:boolean},
   onReserved:(tableId:number)=>void,   
   onCanceled:(tableId:number)=>void
}


const TableCard:React.FC<TableCardProps>=({table,onReserved,onCanceled})=>{
    return(
    <div className="border p-4 rounded shadow-lg">
    <h2 className="text-xl mb-2">Table #{table.id}</h2>
    <p>Capacity: {table.capacity}</p>
    <p>Status: {table.is_reserved ? "Reserved" : "Available"}</p>
    {table.is_reserved ? (
      <button onClick={() => onCanceled(table.id)} className="mt-2 w-full bg-red-500 text-white py-2 rounded">
        Cancel Reservation
      </button>
    ) : (
      <button onClick={() => onReserved(table.id)} className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
        Reserve Table
      </button>
    )}
  </div>
    );
}
export default TableCard;

