import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 


export const getAvailableTables = async () => {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_BASE_URL}/user/tables`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tables", error);
    throw error; 
  }
};


export const reserveTable = async (tableId: number, token: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/tables/reserve?table_id=${tableId}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to reserve table", error);
      throw error;
    }
  };


  export const cancelReservation = async (tableId: number, token: string) => {
    const response = await axios.delete(
      `${API_BASE_URL}/user/tables/cancel?table_id=${tableId}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };