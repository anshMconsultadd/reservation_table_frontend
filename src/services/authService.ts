import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 

export const loginUser = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  

export const signupUser = async (username: string, password: string, role: string) => {
  await axios.post(`${API_BASE_URL}/signup`, { username, password, role });
};
