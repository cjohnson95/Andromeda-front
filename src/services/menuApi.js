import axios from 'axios';

// Define the API base URL where your backend server is running.
const API_BASE_URL = 'http://localhost:3001'; // Replace with your actual backend URL.

// Define the endpoints to fetch menu items.
const MENU_API_URL = `${API_BASE_URL}/menu`; // Adjust the route accordingly.

// Function to fetch menu items from the backend.
export const getMenuItems = async () => {
  try {
    const response = await axios.get(MENU_API_URL);
    return response.data; // Assuming your API returns an array of menu items.
  } catch (error) {
    throw error;
  }
};

export const createMenuItem = async (menuItemData) => {
  try {
    const response = await axios.post(MENU_API_URL, menuItemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add other CRUD operations as needed (update, delete, etc.).
