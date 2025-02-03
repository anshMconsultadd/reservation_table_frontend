import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 



export const loginUser = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      
      return data; 
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  

export const signupUser = async (username: string, password: string, role: string) => {
  await axios.post(`${API_BASE_URL}/signup`, { username, password, role });
};
