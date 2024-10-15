import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("authToken");
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const saveUser = (token) => {
    setAuth(token);
    localStorage.setItem("authToken", token); 
  };

  const logout = () => {
    setAuth(null); 
    localStorage.removeItem("authToken"); 
  };

  return (
    <AuthContext.Provider value={{ auth, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
