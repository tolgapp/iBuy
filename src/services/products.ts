import axios from "axios";
export const baseURL = import.meta.env.VITE_API_URL; 

export const getAllProducts = async () => {
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
}