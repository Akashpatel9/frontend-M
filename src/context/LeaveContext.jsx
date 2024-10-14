import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./usercontext";

const LeavesContext = createContext(null);

export const useLeaves = () => {
  return useContext(LeavesContext);
};

export const LeavesProvider = ({ children }) => {
  const { auth, logout } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set default axios headers with the token if available
  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
    }
  }, [auth]);



  const fetchLeaves = async () => {
    try {
      const res = await axios.get("https://backend-m.onrender.com/leave/getAllLeaves");  
      setLeaves(res.data.data);
    } catch (error) {
        console.log(error);
        if(error.status==401){
            logout();
        }
      setError("Error fetching leaves.");
    } finally {
      setLoading(false);
    }
  };



  // Fetch leaves on initial render
  useEffect(() => {
    fetchLeaves();
  }, [logout]);

  

  // Add leave
  const addLeave = async (formData) => {
    try {
      const res = await axios.post("https://backend-m.onrender.com/leave/addleave", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for file uploads
        },
      });
      console.log(res);
      
      setLeaves((prev) => [...prev, res.data.data]);
      return res;
    } catch (error) {
        if(error.status==401){
            logout();
        }
      const errorMessage = error.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  };

  // Edit leave status
  const editLeaveStatus = async (id, status) => {
    try {
      const res = await axios.put(`https://backend-m.onrender.com/leave/editLeavestatus?id=${id}&status=${status}`);
      setLeaves((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status } : leave
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error editing leave status.");
    }
  };

  return (
    <LeavesContext.Provider
      value={{
        leaves,
        loading,
        error,
        setLeaves,
        addLeave,
        editLeaveStatus,
      }}
    >
      {children}
    </LeavesContext.Provider>
  );
};
