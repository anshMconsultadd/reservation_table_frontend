import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 

export const getAllTables = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/tables`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tables", error);
    throw error;
  }
};


export const createTable = async (capacity :number,token: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/tables`, 
        { capacity, is_reserved: false }, 
        {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create table", error);
      throw error;
    }
  };

export const updateTable = async (tableId: number, capacity: number, token: string) => {
  try {
    await axios.put(
      `${API_BASE_URL}/admin/tables/${tableId}`,
      { capacity, is_reserved: false },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Failed to update table", error);
    throw error;
  }
};

export const deleteTable = async (tableId: number, token: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/admin/tables/${tableId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Failed to delete table", error);
    throw error;
  }
};
