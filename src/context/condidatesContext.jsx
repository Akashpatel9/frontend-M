import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./usercontext";

export const CandidatesContext = createContext(null);

export const useCandidates = () => {
  return useContext(CandidatesContext);
};

export const CandidatesProvider = ({ children }) => {
  const { auth, logout } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nev, setNev] = useState(false);

  // Set default axios headers with the token if available
  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth]);

  // Fetch candidates only when `auth` is available
  useEffect(() => {
    const fetchCandidates = async () => {

      setLoading(true);
      try {
        const res = await axios.get(
          "https://backend-m.onrender.com/condidate/getCondidate"
        );
        setCandidates(res.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          logout(); 
        }
        setError("Error fetching candidates.");
      } finally {
        setLoading(false); 
      }
    };

    if(auth) fetchCandidates();
  }, [auth, logout]);

  // Add candidate
  const addCandidate = async (formData) => {
    try {
      const res = await axios.post(
        "https://backend-m.onrender.com/condidate/addCondidate",
        formData
      );
      setCandidates((prev) => [...prev, res.data.data]);
      return res;
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }
      const errorMessage = error.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  };



  
  // Edit candidate
  const editCandidate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `https://backend-m.onrender.com/condidate/editCondidate/${id}`,
        updatedData
      );
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id == id ? res.data.data : candidate
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error editing candidate.");
    }
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `https://backend-m.onrender.com/condidate/deleteCondidate/${id}`
      );
      console.log(candidates);

      setCandidates((prev) => prev.filter((candidate) => candidate._id != id));
      console.log(candidates);
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error deleting candidate.");
    }
  };

  // Update candidate status
  const updateCandidateStatus = async (id, selectedStatus) => {
    try {
      const res = await axios.put(`https://backend-m.onrender.com/condidate/updateCondidate?id=${id}&status=${selectedStatus}`);
      console.log(res);
      
      setCandidates((prev) =>
        prev.map((candidate) =>
         {
            if(candidate._id == id){
                return {...candidate, status:selectedStatus}
            }
            return candidate
         }
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error updating candidate status.");
    }
  };


  // Update candidate attandencestatus
  const updateCandidateAttandence = async (id, attendenceStatus) => {
    try {
      const res = await axios.put(`https://backend-m.onrender.com/condidate/updateTask?id=${id}&attendenceStatus=${attendenceStatus}`);
      console.log(res);
      
      setCandidates((prev) =>
        prev.map((candidate) =>
         {
            if(candidate._id == id){
                return {...candidate, attendenceStatus:attendenceStatus}
            }
            return candidate
         }
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error updating candidate attendenceStatus.");
    }
  };




  // Update candidate Task
  const updateCandidateTask = async (id, task) => {
    try {
      const res = await axios.put(`https://backend-m.onrender.com/condidate/updateTask?id=${id}&task=${task}`);
      console.log(res);
      
      setCandidates((prev) =>
        prev.map((candidate) =>
         {
            if(candidate._id == id){
                return {...candidate, task:task}
            }
            return candidate
         }
        )
      );
    } catch (error) {
        if(error.status==401){
            logout();
        }
      setError("Error updating candidate task.");
    }
  };



  return (
    <CandidatesContext.Provider
      value={{
        candidates,
        loading,
        error,
        addCandidate,
        editCandidate,
        deleteCandidate,
        updateCandidateStatus,
        updateCandidateAttandence,
        updateCandidateTask,
        nev, setNev
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};
