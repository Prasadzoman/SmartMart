import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",  
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${token}`, (if needed, add later dynamically)
  },
});

export default instance;